import { Request, Response, NextFunction } from "express";
import { ValidationSchemaService } from "@schema/validation.schema.service";
import { UnprocessableEntityError } from "@error/erros.mudule";
import { schema } from "../schemas/create.template.schema";
import { TemplateJobModule } from '../template.job.module';

export class CreateTemplateController {
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

      templateJobModule.queue.add(body);
      return res
        .status(201)
        .json({
          message: "Solicitação para criar o template efetuado com sucesso",
        });
    } catch (error) {
      next(error);
    }
  }
}
