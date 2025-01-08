import { BullService } from "@bull/bull.service";
export class TemplateJobModule extends BullService {
  constructor() {
    super("template");
  }

  inicialize() {
    this.events();
  }

  private events() {
    this.queue.on("global:completed", (data) => {
      console.log(`${this.name} completed`, data);
    });

    this.queue.on("global:error", (data) => {
      console.log(`${this.name} error`, data);
    });

    this.queue.on("progress", (data) => {
      console.log(`${this.name} progreess`, data);
    });
  }
}
