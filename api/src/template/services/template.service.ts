import TemplatesRepository, {
  TemplatesRepository as BaseTemplatesRepository,
} from "../repositories/templates.repository";
import prisma from "@prisma/connection";
import { UploadsModule } from "@src/upload/upload.module";
export class TemplateService {
  async createOrUpdateTemplatesLocal() {
    const uploadsModule = new UploadsModule();
    const templates = uploadsModule.uploads.templates.filesUpload();

    await prisma.$transaction(async (trx) => {
      const templatesRepository = BaseTemplatesRepository.transaction(trx);

      const arrrayPromise = templates.map(async (template) => {
        return await templatesRepository.upsert(template);
      });

      await Promise.all(arrrayPromise);
    });
  }
}
