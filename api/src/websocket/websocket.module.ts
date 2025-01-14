import { type Server } from "socket.io";
import { SocketsModule } from './sockets.module';
import { TemplateJobModule  } from '@src/template/template.job.module';

export class WebSocketModule {
  static eventsName = {
    template: {
      templateCompleted: "create_template_completed",
    },
  };

  constructor(
    private readonly io: Server
  ) {}

  static instance(io: Server) {

    io.on("connection", (socket) => {
      console.log("✅ Websocket connected");
      SocketsModule.inicialize(socket);
    });

    io.on("disconnect", (socket) => {
      console.log("🌐 Websocket disconnected");
    });

     const templateJobModule = new TemplateJobModule();
     templateJobModule.queue.on("global:completed", (id, response) => {
        const { data } = JSON.parse(response)

        const paramsEmit = {
          data: {
            file: Buffer.from(data.pdf),
          },
        };

        io.to(id).emit(this.eventsName.template.templateCompleted, paramsEmit);
     });

    return new WebSocketModule(io);
  }
}
