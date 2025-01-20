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

    const url = data.template_url
      .replace("${host}", "api")
      .replace("${port}", String(process.env.API_PORT));

    job.progress(5)
    const buffer_file = await UploadModule.download(url);
    job.progress(10);

    const dataDocument = await DocumentTemplateService.useTemplate(job,{
      file: buffer_file,
      data: data.variables,
    });
    job.progress(100);

    return dataDocument;
  }
}
