import path from 'path';
import {UploadsTemplateService} from './services/upload.template.service'

export class UploadsModule {
  uploads: {
    templates: UploadsTemplateService;
  };

    public  path_public = path.resolve(
    __dirname,
    "../",
    "../",
    "uploads",
    "public"
  );
  constructor() {

    this.uploads = {
      templates: new UploadsTemplateService(this.path_public)
    }
  }

}
