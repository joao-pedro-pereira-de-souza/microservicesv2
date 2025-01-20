import { Request, Response, NextFunction } from "express";
import { ValidationSchemaService } from "@schema/validation.schema.service";
import { UnprocessableEntityError } from "@error/erros.mudule";
import { schema } from "../schemas/use.template.schema";
import { TemplateJobModule } from "../template.job.module";

export class UseTemplateController {
  async execute(
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const validation = ValidationSchemaService.validation(schema, req.body);
      if (!validation.success) {
        throw new UnprocessableEntityError("Dados inválido", validation.data);
      }

      const body = req.body;
      const templateJobModule = new TemplateJobModule();

      const job = await templateJobModule.queue.add(body);

      console.log({job})
      return res.status(201).json({
        message: "Solicitação para usar o template efetuado com sucesso",
        items: job,
      });
    } catch (error) {
      next(error);
    }
  }
}
