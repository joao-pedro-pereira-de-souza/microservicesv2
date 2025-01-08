import Queue from "bull";

export class BullModule {
  public name: String;
  public queue: Queue.Queue;

  private connection = {
    redis: {
      host: process.env.DB_REDIS_HOST as string,
      port: Number(process.env.DB_REDIS_PORT),
      password: process.env.DB_REDIS_PASSWORD as string,
    },
  };
  constructor(queue_name: string) {
    this.queue = new Queue(queue_name, { redis: this.connection.redis });
    this.name = queue_name;
  }
}
