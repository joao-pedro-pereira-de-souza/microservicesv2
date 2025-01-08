

import { TemplateJobModule } from '@src/template/template.job.module';

export class BullModule {

   static inicialize() {
      const templateJobModule = new TemplateJobModule();

      templateJobModule.inicialize();
   }
}
