import { BullService } from "@bull/bull.service";
import { Job } from 'bull';

export class TemplateJobModule extends BullService {
  constructor() {
    super("template");
  }

  inicialize() {
    this.events();
  }

  private events() {

    this.queue.on("global:error", (data) => {
      console.log(`${this.name} error`, data);
    });

    this.queue.on("progress", (data) => {
      console.log(`${this.name} progreess`, data);
    });
  }
}
