import { type Socket, type Server } from "socket.io";
import { WebSocketModule } from "./websocket.module";
export class SocketsModule {
  static inicialize(socket: Socket) {
    socket.on(
      WebSocketModule.eventsName.template.templateCompleted,
      async (data) => {
        socket.join(data.job_id);
      }
    );

    socket.on(WebSocketModule.eventsName.template.progress, async (data) => {
      socket.join(data.job_id);
    });
  }
}
