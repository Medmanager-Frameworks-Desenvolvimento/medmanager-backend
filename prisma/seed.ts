import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import csv from 'csv-parser';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não está definida. Verifique o arquivo .env.');
  }

  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  });

  const prisma = new PrismaClient({ adapter } as any);

  try {
    const medicamentos: any[] = [];
    let primeiraLinhaLida = false;

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream('medicamentos.csv')
        .pipe(
          csv({
            separator: ',',
            skipLines: 41,  
            mapHeaders: ({ header }) => header.trim().toUpperCase() 
          }),
        )
        .on('data', (row) => {
          if (!primeiraLinhaLida) {
            primeiraLinhaLida = true;
          }

          const substancia = row['SUBSTÂNCIA'] || row['SUBSTANCIA'];
          const produto = row['PRODUTO'];
          const laboratorio = row['LABORATÓRIO'] || row['LABORATORIO'];
          const registro = row['REGISTRO'];

          if (substancia && produto) {
            medicamentos.push({
              nome_comercial: produto.trim(),
              principio_ativo: substancia.trim(),
              fabricante: laboratorio ? laboratorio.trim() : 'Não informado',
              registro_anvisa: registro ? registro.trim() : null,
            });
          }
        })
        .on('end', async () => {
          try {
            if (medicamentos.length === 0) {
              resolve();
              return;
            }
            const chunkSize = 500; 
            
            for (let i = 0; i < medicamentos.length; i += chunkSize) {
              const chunk = medicamentos.slice(i, i + chunkSize);

              await Promise.all(
                chunk.map(async (med) => {
                  if (med.registro_anvisa) {
                    return prisma.catalogoMedicamento.upsert({
                      where: { registro_anvisa: med.registro_anvisa },
                      update: med,
                      create: med,
                    });
                  } else {
                    return prisma.catalogoMedicamento.create({
                      data: med,
                    }).catch(() => {}); 
                  }
                })
              );
              
              console.log(`Salvos: ${Math.min(i + chunkSize, medicamentos.length)} de ${medicamentos.length}`);
            }

            console.log('Catálogo importado com sucesso!');
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Erro:', error);
          reject(error);
        });
    });

  } catch (e) {
    console.error('Erro:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();