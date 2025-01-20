import { PrismaClient } from "prisma/prisma-client";
import prisma, { PrismaTransactionalClient } from "@prisma/connection";

export class TemplatesRepository {
  constructor(
    private readonly prisma: PrismaClient | PrismaTransactionalClient
  ) {}

  static getInstance() {
    return new TemplatesRepository(prisma);
  }

  static transaction(trx: PrismaTransactionalClient) {
    return new TemplatesRepository(trx);
  }

  async list() {
    return this.prisma.templates.findMany();
  }

  async listManyByTemplates( limit: number, page: number) {
    const items = await this.prisma.templates.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalItems = await prisma.templates.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      total_items: totalItems,
      total_pages: totalPages,
      items,
    };
  }

  async create(template: { url: string }) {
    return this.prisma.templates.create({
      data: template,
    });
  }

  async upsert(templates: { url: string }) {
    return this.prisma.templates.upsert({
      where: { url: templates.url },
      update: { url: templates.url },
      create: { url: templates.url },
    });
  }
  async update(id: string, template: { url: string }) {
    return this.prisma.templates.update({
      where: { id },
      data: template,
    });
  }

  async delete(id: string) {
    return this.prisma.templates.delete({
      where: { id },
    });
  }
}

export default TemplatesRepository.getInstance();
