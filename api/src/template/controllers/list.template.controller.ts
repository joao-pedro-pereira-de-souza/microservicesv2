import { Request, Response, NextFunction } from "express";
import TemplatesRepository from "../repositories/templates.repository";
import { schema, SchemaInterface } from "@schema/list.schema";
import { ValidationSchemaService } from "@schema/validation.schema.service";
import { UnprocessableEntityError } from "@error/erros.mudule";

export class ListTemplateController {
  async execute(
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const validation = ValidationSchemaService.validation(schema, req.query);
      if (!validation.success) {
        throw new UnprocessableEntityError("Dados inválido", validation.data);
      }

      const {page, limit} = req.query as SchemaInterface;

      const list = await TemplatesRepository.listManyByTemplates(limit ? Number(limit) : 10, page ? Number(page) : 1);

      list.items.forEach((item: any) => {
        item.base = item.url
        item.url = item.url
          .replace('${host}', String(process.env.HOST))
          .replace("${port}", String(process.env.PORT));
      })
      return res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }
}
