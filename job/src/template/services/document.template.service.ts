import { mkdtemp, mkdir, writeFile } from "fs/promises";
import path from "path";
import { rmSync } from "fs";
import bull from 'bull'

import { DocumentConvert } from "@root/src/document/services/document.service";
import {InternalServerError} from '@error/erros.mudule'

interface ParamsUseTemplateInterface {
  file: Buffer;
  data: Object;
}


interface ParamsReplaceDocumentInterface {
  source_file: string;
  file: Buffer;
  data: Object;
}

interface ParamsDropFolderInterface {
  source: string;
}


export class DocumentTemplateService {
  private static async setupFolderTemp(){
    try {
      const pathTemp = path.resolve(path.dirname(__dirname), '../', '../', "temp");

       console.log({pathTemp});
      await mkdir(pathTemp, { recursive: true });

      const folderTemp = await mkdtemp(pathTemp + "/");
      return {
        data: { path: folderTemp },
      };
    } catch (error) {


      throw new InternalServerError("setupFolderTemp Error", error );
    }
  }

  private static rmFolder(
    params: ParamsDropFolderInterface
  ) {
    try {
      const { source } = params;

      rmSync(source, { recursive: true, force: true });

    } catch (error) {
      throw new InternalServerError("rmFolder error", error );
    }
  }

  private static async replaceDocument(
    params: ParamsReplaceDocumentInterface
  ) {
    try {
      const { data, file, source_file } = params;

      let bufferString = file.toString();

      console.log({ xml: bufferString });
      if (Object.entries(data).length) {
        for (const [key, property] of Object.entries(data)) {
          const regex = new RegExp(`\\${key}`, "g");

          bufferString = bufferString.replace(regex, String(property));
        }
      }

      const newFileXml = Buffer.from(bufferString);

      await writeFile(source_file, newFileXml);
    } catch (error) {
      throw new InternalServerError("replaceDocument error", error);
    }
  }

  static async useTemplate(
    job: bull.Job,
    params: ParamsUseTemplateInterface
  ){
    try {
      const { file, data } = params;

      const fullNamePdfTemplate = "template.pdf";

      const responsePathTemp = await this.setupFolderTemp();
      job.progress(15)

      const sourceTemplate = `${responsePathTemp.data?.path}/`;
      const pathFilePdf = `${sourceTemplate + fullNamePdfTemplate}`;

      await writeFile(pathFilePdf, file);

      const paramsConvertDocument = {
        input_file: pathFilePdf,
        output: sourceTemplate,
      };

      job.progress(25);


      const responseConvertPdfToXml = await DocumentConvert.convertPdfToXml(
        paramsConvertDocument
      );

      const paramsReplaceDocument = {
        source_file: responseConvertPdfToXml.data.output,
        file: responseConvertPdfToXml.data.file,
        data,
      };

      job.progress(50);

      await this.replaceDocument(paramsReplaceDocument);

      const paramsConvertDocumentXmlToPdf = {
        input_file: responseConvertPdfToXml.data.output,
        output: sourceTemplate,
      };

      const responseConvertXmlToPdf = await DocumentConvert.convertXmlToPdf(paramsConvertDocumentXmlToPdf);
      job.progress(75);

      const paramsRmFolder = {
        source: responsePathTemp.data.path,
      };

      this.rmFolder(paramsRmFolder);

      return {
        data: {
          pdf: responseConvertXmlToPdf.data.file,
        },
      };
    } catch (error) {
      throw new InternalServerError("useTemplate Error", error);
    }
  }
}
