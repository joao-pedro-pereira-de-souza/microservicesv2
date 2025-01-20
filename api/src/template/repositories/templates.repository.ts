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

  async create(template: { url: string }) {
    return this.prisma.templates.create({
      data: template,
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
      where: { id }
    });
  }
}

export default TemplatesRepository.getInstance();
