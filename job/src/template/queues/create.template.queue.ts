import { BullModule } from "@root/src/queue/queue.service";
import { CreateTemplateJobService } from '../services/create.template.job.service'

export class CreateTemplateQueue extends BullModule {
  constructor(
    private readonly createTemplateJobService: CreateTemplateJobService
  ) {
    super("template");
  }

  static instance() {
    const createTemplateJobService = new CreateTemplateJobService();
    return new CreateTemplateQueue(createTemplateJobService);
  }

  inicialize() {
    this.queue.process(this.createTemplateJobService.execute);

    this.events();
  }
  events() {
    this.queue.on("error", (error) => {
      console.error(error);
    });

    this.queue.on("active", (queue) => {
      console.log(`queue active: ${this.name}, id: ${queue.id} `);
    });

    this.queue.on("completed", (queue) => {
      console.log(`queue completed: ${this.name}, id: ${queue.id} `);
    });

    this.queue.on("failed", (queue, error) => {
      console.log(`queue failed: ${this.name}, id: ${queue.id} `);
      console.error(error);
    });
  }
}
