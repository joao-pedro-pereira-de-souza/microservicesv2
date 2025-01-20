import { Dispatch, SetStateAction } from "react";
import { Api } from "../../../../services/api";
import { SocketService } from '../../../../services/socket';

interface Input {
  urlPdf: string;
  basePdf: string;
  variables: object;
  setIsTemplateUsed: Dispatch<SetStateAction<boolean>>;
  setProgressValue: Dispatch<SetStateAction<number>>;
  setPdfOutput: Dispatch<SetStateAction<File | null>>;
  pdfOutput: File | null;
}
export class TemplateService {
  constructor(public readonly params: Input) {}

  async handleUseTemplate() {
    try {
      console.log("================ 1= =======================");

      this.validation();
      console.log("================ 2= =======================");

      const api = Api.instance();
      console.log("================ 3= =======================");

      this.params.setIsTemplateUsed(true);
      const paramsUse = {
        template_url: this.params.basePdf,
        variables: this.params.variables,
      };
      const response = await api.template.use(paramsUse);
      console.log({ paramsUse });
      console.log("================ 4= =======================");

      const socket = SocketService.instance();
      console.log("================ 5= =======================");

      socket.template.emitCreateTemplateProgress({
        job_id: response.items.id,
      });

      socket.template.emitCreateTemplateCompleted({
        job_id: response.items.id,
      });


      console.log("================ 6= =======================");

      socket.template.onCreateTemplateProgress(this);
      socket.template.onCreateTemplateCompleted(this);

      console.log("================ 7= =======================");
    } catch (error) {
      console.error(error);
    }
  }

  validation() {
    if (!Object.keys(this.params.variables).length) {
      throw new Error("É obrigatório ter pelo menos uma variáveis");
    }
  }

  handleDownload() {
    if (!this.params.pdfOutput) return;

      const url = URL.createObjectURL(this.params.pdfOutput);
      const link = document.createElement("a");
      link.href = url;
      link.download = this.params.pdfOutput.name;
      link.click();

      // Libera o URL criado
      URL.revokeObjectURL(url);
  }
}
