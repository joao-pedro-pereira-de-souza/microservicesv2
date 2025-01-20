import { UploadsModule } from "../upload.module";
import fs from "fs";
import path from "path";

export class UploadsTemplateService {
  base_url = "http://${host}:${port}/uploads";
  path_public;
  constructor(path_public: string) {
    this.path_public = path_public;
  }

  filesUpload() {
    const filesPdf = this.getFilesFolder("/pdf/templates/");
    const formatFilesPdf = this.formatFiles(filesPdf, "/pdf/templates/");

    return formatFilesPdf;
  }

  formatFiles(files: string[], path_fixed: string) {
    return files.map((file) => {
      return { url: this.base_url + path_fixed + file };
    });
  }


  private getFilesFolder(path_fixed: string) {
    const pathTemplates = this.path_public + path_fixed;

    const files = fs.readdirSync(pathTemplates);
    return files;
  }
}
