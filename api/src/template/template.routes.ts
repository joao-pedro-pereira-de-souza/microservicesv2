import express, { Express } from 'express';
import { CreateTemplateController } from './controllers/create.template.controller';

export class TemplateRoutes {
  static #prefix = '/templates';

  static inicialize(app: Express) {
    const router = express.Router();

    router.post("/", new CreateTemplateController().execute);
    app.use(this.#prefix, router);
  }
}
