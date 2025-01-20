import express, { Express } from 'express';
import { CreateTemplateController } from './controllers/create.template.controller';
import { UseTemplateController } from "./controllers/use.template.controller";
import { ListTemplateController } from "./controllers/list.template.controller";
import { UpdateTemplateController } from "./controllers/update.template.controller";
import { DeleteTemplateController } from "./controllers/delete.template.controller";

export class TemplateRoutes {
  static #prefix = '/templates';

  static inicialize(app: Express) {
    const router = express.Router();

    router.post("/", new CreateTemplateController().execute);
    router.get("/", new ListTemplateController().execute);
    router.put("/:id", new UpdateTemplateController().execute);
    router.delete("/:id", new DeleteTemplateController().execute);
    router.post("/use", new UseTemplateController().execute);
    app.use(this.#prefix, router);
  }
}
