import { exec } from "child_process";
import { promisify } from "util";
import { readFileSync } from "fs";
import { InternalServerError } from "@error/erros.mudule";

interface ParamsDefaultConvertDocumentInterface {
  input_file: string;
  output?: string;
}

interface ParamsSofficeGetOutputInterface {
  stdout: string;
}

export class DocumentConvert {
  static execPromise = promisify(exec);

  private static sofficeGetOutput(
    params: ParamsSofficeGetOutputInterface,
    isPdf?: boolean
  ) {
    const { stdout } = params;
    const regex = isPdf && isPdf === true ? /(\S+\.pdf)\b/ : /(\S+\.xml)\b/;
    const matchStdout = stdout.match(regex);

    const output = matchStdout?.[0];

     if (!output?.length) {
       console.log('================================================== 2 ===================================================')
      throw new InternalServerError("output");
    }

    return {
      data: { output },
    };
  }

  static async convertPdfToXml(params: ParamsDefaultConvertDocumentInterface) {
    try {
      const { input_file, output } = params;

      const script = `soffice --headless --convert-to xml --outdir ${output} ${input_file} `;
      const responseSoffice = await this.execPromise(script);

       if (!responseSoffice.stdout.length || responseSoffice.stderr.length) {
          console.log('===================== 1 =================================')
          console.log({ responseSoffice });
          console.log(
            "===================== end 1 ================================="
          );

         throw new InternalServerError('Error response soffice')
      }

      const paramsSofficeGetOutput = {
        stdout: responseSoffice.stdout,
      };

      const responseSofficeGetOutput = this.sofficeGetOutput(paramsSofficeGetOutput);

      const sourceFileXml = responseSofficeGetOutput.data.output as string;
      const fileXml = readFileSync(sourceFileXml);

      return {
        data: {
          output: sourceFileXml,
          file: fileXml,
        },
      };
    } catch (error) {
      throw new InternalServerError("Ocorreu um erro no convertPdfToXml", error);
    }
  }

  static async convertXmlToPdf(params: ParamsDefaultConvertDocumentInterface) {
    try {
      const { input_file, output } = params;

      const script = `soffice --headless --convert-to pdf --outdir ${output} ${input_file} `;
      const responseSoffice = await this.execPromise(script);

      if (!responseSoffice.stdout.length || responseSoffice.stderr.length) {
       throw new InternalServerError("stdout or stderr invalid" );
      }

      const paramsSofficeGetOutput = {
        stdout: responseSoffice.stdout,
      };

      const responseSofficeGetOutput = this.sofficeGetOutput(
        paramsSofficeGetOutput,
        true
      );

      const sourceFilePdf = responseSofficeGetOutput.data.output as string;
      const filePdf = readFileSync(sourceFilePdf);
      return {
        data: {
          file: filePdf,
        },
      };
    } catch (error) {
      throw new InternalServerError("Ocorreu um erro no convertXmlToPdf", error);
    }
  }
}
