import { CreateTemplateQueue } from "@root/src/template/queues/create.template.queue";

export class QueuesModule {
  constructor(public readonly createTemplateQueue: CreateTemplateQueue) {}

  static instance() {
    const createTemplateQueue = CreateTemplateQueue.instance()

    return new QueuesModule(createTemplateQueue);
  }

  inicialize() {
    this.createTemplateQueue.inicialize();
  }
}

export default QueuesModule.instance();
