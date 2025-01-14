import { AppServer } from './app.module';
import { BullModule } from '@bull/bull.module';
import { WebSocketModule } from '@src/websocket/websocket.module';
import IO from 'socket.io';

export class ServerModule {

  static async inicialize() {
    const instanceApp = AppServer.getInstance();
    const server = instanceApp.inicialize();

    const io = new IO.Server(instanceApp.http);
    WebSocketModule.instance(io)
      ;
    BullModule.inicialize();
    return {
      server,
    };
  }
}

export const serverInicialize = ServerModule.inicialize();
