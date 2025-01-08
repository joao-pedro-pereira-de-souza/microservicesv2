import { AppServer } from './app.module';
import { QueuesModule } from '@root/src/queue/queue.module';
export class ServerModule {

  static async inicialize() {
    const instanceApp = AppServer.getInstance();
    const server = instanceApp.inicialize();
 console.log({
   teste: process.env.SIGNATURE_COOKIE,
   DB_REDIS_HOST: process.env.DB_REDIS_HOST,
 });
    const queuesModule = QueuesModule.instance();
    queuesModule.inicialize();
    return {
      server,
    };
  }
}

export const serverInicialize = ServerModule.inicialize();
