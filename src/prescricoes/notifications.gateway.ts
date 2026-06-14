import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
   origin: 'http://localhost:5173', 
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotificationsGateway.name)

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Desconectado: ${client.id}`);
  }

  enviarAlertaAtraso(idAdmin: string, dadosNotificacao: any) {
    this.server.to(`admin_${idAdmin}`).emit('medicamento-atrasado', dadosNotificacao);
  }

  @SubscribeMessage('joinAdminRoom')
  handleJoinRoom(client: Socket, idAdmin: string) {
    client.join(`admin_${idAdmin}`);
    this.logger.log(`${client.id} entrou na sala admin_${idAdmin}`);
  }
}