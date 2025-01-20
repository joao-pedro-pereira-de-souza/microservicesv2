import { TemplateService } from '../../src/template/services/template.service'

class Seeds {
   template: TemplateService

   constructor() {
      this.template = new TemplateService()
   }

   async inicialize() {
      await this.template.createOrUpdateTemplatesLocal();

   }
}

const seeds = new Seeds();

seeds.inicialize();
