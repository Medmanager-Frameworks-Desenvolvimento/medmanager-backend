import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreatePrescricaoDto } from './dto/create-prescricao.dto';
import { UpdatePrescricaoDto } from './dto/update-prescricao.dto';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class PrescricoesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsGateway: NotificationsGateway
  ) {}

  private normalizarDataHoraParaUtc(dataHoraStr: string): Date {
    if (dataHoraStr.endsWith('Z') || /([+-]\d{2}:\d{2})$/.test(dataHoraStr)) {
      return new Date(dataHoraStr);
    }
    return new Date(`${dataHoraStr}-03:00`);
  }

  @Cron(CronExpression.EVERY_MINUTE, {
      timeZone: 'America/Sao_Paulo',
  })
  async verificarEVerificarMedicacoesAtrasadas() {
    const agora = new Date();

    try {
      const prescricoesAtrasadas = await this.prisma.prescricao.findMany({
        where: {
          deletedAt: null,
          tomou_medicacao: false,
          notificado_atraso: false,
          data_hora: {
            lt: agora, 
          },
        },
        include: {
          paciente: { select: { nome: true } },
          medicamento: { select: { nome: true } },
          enfermeiro: { select: { nome: true } },
        },
      });

      for (const prescricao of prescricoesAtrasadas) {
        this.notificationsGateway.enviarAlertaAtraso(prescricao.id_admin, {
          idPrescricao: prescricao.id,
          pacienteNome: prescricao.paciente.nome,
          medicamento: prescricao.medicamento.nome,
          dosagem: prescricao.dosagem,                 
          enfermeiroNome: prescricao.enfermeiro.nome,
          horarioPlanejado: prescricao.data_hora,
          turno: prescricao.turno,
        });

        await this.prisma.prescricao.update({
          where: { id: prescricao.id },
          data: { notificado_atraso: true },
        });
      }
    } catch (error) {
      console.error('Erro na verificação de medicações atrasadas:', error);
    }
  }

  async findAtrasadas(idAdmin: string) {
    return await this.prisma.prescricao.findMany({
      where: {
        id_admin: idAdmin,
        deletedAt: null,
        tomou_medicacao: false,    
        notificado_atraso: true,   
      },
      include: {
        paciente: { select: { nome: true } },
        medicamento: { select: { nome: true } },
      },
      orderBy: {
        data_hora: 'desc',
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
      timeZone: 'America/Sao_Paulo',
  })
  async resetarStatusMedicacaoDiario() {
    try {
      await this.prisma.prescricao.updateMany({
        where: { 
          deletedAt: null,
          OR: [
            { tomou_medicacao: true },
            { notificado_atraso: true }
          ]
        },
        data: { 
          tomou_medicacao: false,
          notificado_atraso: false 
        },
      });
    } catch (error) {
      console.error('Erro ao resetar o status diário:', error);
    }
  }

  async create(idAdmin: string, data: CreatePrescricaoDto) {
    const medicamento = await this.prisma.medicamento.findFirst({
      where: {
        id: data.id_medicamento,
        id_admin: idAdmin,
        deletedAt: null,
      },
    });

    if (!medicamento) {
      throw new NotFoundException('Medicamento não encontrado.');
    }

    if (medicamento.quantidade <= 0) {
      throw new BadRequestException(
        `O medicamento "${medicamento.nome}" está fora de estoque e não pode ser prescrito.`,
      );
    }

    const [paciente, enfermeiro] = await Promise.all([
      this.prisma.paciente.findFirst({ where: { id: data.id_paciente, id_admin: idAdmin, deletedAt: null } }),
      this.prisma.enfermeiro.findFirst({ where: { id: data.id_enfermeiro, id_admin: idAdmin, deletedAt: null } }),
    ]);

    if (!paciente) throw new NotFoundException('Paciente não encontrado.');
    if (!enfermeiro) throw new NotFoundException('Enfermeiro não encontrado.');

    return await this.prisma.prescricao.create({
      data: {
        id_admin: idAdmin,
        id_paciente: data.id_paciente,
        id_enfermeiro: data.id_enfermeiro,
        id_medicamento: data.id_medicamento,
        dosagem: data.dosagem,
        quantidade: data.quantidade,
        unidade_medida: data.unidade_medida,
        turno: data.turno,
        data_hora: this.normalizarDataHoraParaUtc(data.data_hora), // <-- CORRIGIDO AQUI
      },
    });
  }

  async totalData(idAdmin: string) {
    const [
      pacientes, 
      medicamentos, 
      pacientesNaoMedicados, 
      prescricoesAgrupadas, 
      pacientesComDoencas
    ] = await Promise.all([

      this.prisma.paciente.count({
        where: { id_admin: idAdmin, deletedAt: null },
      }),

      this.prisma.medicamento.count({
        where: { id_admin: idAdmin, deletedAt: null },
      }),

      this.prisma.paciente.count({
        where: {
          id_admin: idAdmin,
          deletedAt: null,
          prescricoes: { 
            some: { 
              deletedAt: null,
              tomou_medicacao: false 
            } 
          },
        },
      }),

      this.prisma.prescricao.groupBy({
        by: ['turno'],
        where: { id_admin: idAdmin, deletedAt: null },
        _count: { turno: true },
      }),

      this.prisma.paciente.findMany({
        where: { id_admin: idAdmin, deletedAt: null },
        select: { doenca_cronica: true },
      })
    ]);

    const turnosFormatados = { 'Manhã': 0, 'Tarde': 0, 'Noite': 0 };
    prescricoesAgrupadas.forEach(p => {
      turnosFormatados[p.turno] = p._count.turno;
    });

    const doencasMap: Record<string, number> = {};
    pacientesComDoencas.forEach(p => {
      if (p.doenca_cronica && p.doenca_cronica.length > 0) {
        p.doenca_cronica.forEach(doenca => {
          doencasMap[doenca] = (doencasMap[doenca] || 0) + 1;
        });
      }
    });

    return { 
      pacientes, 
      medicamentos, 
      pacientesNaoMedicados,
      graficoTurnos: {
        labels: Object.keys(turnosFormatados),
        series: Object.values(turnosFormatados)
      },
      graficoDoencas: {
        labels: Object.keys(doencasMap),
        series: Object.values(doencasMap)
      }
    };
  }

  async findAll(idAdmin: string) {
    return await this.prisma.prescricao.findMany({
      where: {
        id_admin: idAdmin,
        deletedAt: null,
      },
      include: {
        paciente: { select: { nome: true, idade: true, doenca_cronica: true } },
        enfermeiro: { select: { nome: true } },
        medicamento: { select: { nome: true } },
      },
      orderBy: {
        data_hora: 'desc',
      },
    });
  }

  async findOne(idAdmin: string, id: number) {
    const prescricao = await this.prisma.prescricao.findFirst({
      where: {
        id: id,
        id_admin: idAdmin,
        deletedAt: null,
      },
      include: {
        paciente: { select: { nome: true, idade: true, doenca_cronica: true } },   
        medicamento: { select: { nome: true } },
        enfermeiro: { select: { nome: true } },
      },
    });

    if (!prescricao) {
      throw new NotFoundException('Prescrição não encontrada.');
    }

    return prescricao;
  }

  async update(idAdmin: string, id: number, data: UpdatePrescricaoDto) {
    const prescricaoAtual = await this.findOne(idAdmin, id);

    if (data.id_medicamento && data.id_medicamento !== prescricaoAtual.id_medicamento) {
      const novoMedicamento = await this.prisma.medicamento.findFirst({
        where: { id: data.id_medicamento, id_admin: idAdmin, deletedAt: null },
      });

      if (!novoMedicamento || novoMedicamento.quantidade <= 0) {
        throw new BadRequestException('O medicamento selecionado não está disponível.');
      }
    }

    const dataHoraConvertida = data.data_hora 
      ? this.normalizarDataHoraParaUtc(data.data_hora) 
      : undefined;

    return await this.prisma.prescricao.update({
      where: { 
        id: id,
        id_admin: idAdmin 
      }, 
      data: {
        ...data,
        data_hora: dataHoraConvertida,
        ...(data.data_hora && { notificado_atraso: false })
      },
    });
  }

  async remove(idAdmin: string, id: number) {
    await this.findOne(idAdmin, id);

    return await this.prisma.prescricao.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}