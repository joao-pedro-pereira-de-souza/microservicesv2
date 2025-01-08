import { AppServer } from './app.module';
import { BullModule } from '@bull/bull.module';
export class ServerModule {

  static async inicialize() {
    const instanceApp = AppServer.getInstance();
    const server = instanceApp.inicialize();

    BullModule.inicialize();
    return {
      server,
    };
  }
}

export const serverInicialize = ServerModule.inicialize();
