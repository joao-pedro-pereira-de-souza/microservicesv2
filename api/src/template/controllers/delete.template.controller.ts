import { Request, Response, NextFunction } from "express";
import { ValidationSchemaService } from "@schema/validation.schema.service";
import { UnprocessableEntityError } from "@error/erros.mudule";
import { schema  } from "../schemas/delete.template.schema";
import TemplatesRepository from "../repositories/templates.repository";

export class DeleteTemplateController {
  async execute(
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const validation = ValidationSchemaService.validation(schema, req.params);
      if (!validation.success) {
        throw new UnprocessableEntityError("Dados inválido", validation.data);
      }
      await TemplatesRepository.delete(req.params.id);

      return res.status(200).json({
        message: "Template delete successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}
