import { Request, Response, NextFunction } from "express";
import { ValidationSchemaService } from "@schema/validation.schema.service";
import { UnprocessableEntityError } from "@error/erros.mudule";
import { schema, schemaInterface } from "../schemas/update.template.schema";
import TemplatesRepository from "../repositories/templates.repository";

export class UpdateTemplateController {
  async execute(
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const validation = ValidationSchemaService.validation(schema, {...req.body, ...req.params});
      if (!validation.success) {
        throw new UnprocessableEntityError("Dados inválido", validation.data);
      }

      const body: schemaInterface = req.body;

      const templates = await TemplatesRepository.update(req.params.id, {
        url: body.template_url,
      });

      return res.status(200).json({
        message: "Template update successfully",
        items: templates,
      });
    } catch (error) {
      next(error);
    }
  }
}
