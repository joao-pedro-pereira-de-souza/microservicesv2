import { Job } from "bull";
import { CreateTemplateJobDTO } from '../dto/create.template.job.dto';
import { UploadModule } from '@upload/upload.module';
import { DocumentTemplateService  } from './document.template.service';

export class CreateTemplateJobService {
  static instance() {
    return new CreateTemplateJobService();
  }

  async execute(job: Job) {

    const data = job.data as CreateTemplateJobDTO;

    const buffer_file = await UploadModule.download(data.template_url);
    const dataDocument = await DocumentTemplateService.useTemplate({
      file: buffer_file,
      data: data.variables,
    });

    console.log({ dataDocument });

    return dataDocument;
  }
}
