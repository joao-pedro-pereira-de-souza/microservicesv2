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

    job.progress(5)
    const buffer_file = await UploadModule.download(
      "https://firebasestorage.googleapis.com/v0/b/plataformssync.appspot.com/o/files%2Ftemplate2.pdf?alt=media&token=0f173c2d-abfa-4a18-bd84-b5324bc06263"
    );
    job.progress(10);

    const dataDocument = await DocumentTemplateService.useTemplate(job,{
      file: buffer_file,
      data: data.variables,
    });
    job.progress(100);

    return dataDocument;
  }
}
