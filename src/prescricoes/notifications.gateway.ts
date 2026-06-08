import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
   origin: 'http://localhost:5173', 
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado ao WebSocket: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  enviarAlertaAtraso(idAdmin: string, dadosNotificacao: any) {
    this.server.to(`admin_${idAdmin}`).emit('medicamento-atrasado', dadosNotificacao);
  }

  @SubscribeMessage('joinAdminRoom')
  handleJoinRoom(client: Socket, idAdmin: string) {
    client.join(`admin_${idAdmin}`);
    console.log(`Cliente ${client.id} entrou na sala admin_${idAdmin}`);
  }
}