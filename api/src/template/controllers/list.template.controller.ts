import { Request, Response, NextFunction } from "express";
import TemplatesRepository from "../repositories/templates.repository";

export class ListTemplateController {
  async execute(
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
       const templates = await TemplatesRepository.list();

      return res.status(200).json({
        items: templates,
      });
    } catch (error) {
      next(error);
    }
  }
}
