import {  Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter/lib/cjs/index.d.ts";
import {TemplateService} from '../../app/routes/template/services'

export class SocketTemplateService {
  constructor(
    private readonly baseIO: Socket<DefaultEventsMap, DefaultEventsMap>
  ) {}

  emitCreateTemplateCompleted(params: { job_id: string }) {
    this.baseIO.emit("create_template_completed", params);
  }

  emitCreateTemplateProgress(params: { job_id: string }) {
    this.baseIO.emit("create_template_progress", params);
  }

  onCreateTemplateCompleted(templateService: TemplateService) {
    this.baseIO.on("create_template_completed", (response) => {
      console.log({
        on: JSON.stringify(response),
        variables: templateService.params.variables,
      });
      if (response?.data?.file) {
        templateService.params.setProgressValue(100);
        const pdfBlob = new Blob([response.data.file], {
          type: "application/pdf",
        });
        const pdfFile = new File([pdfBlob], "documento.pdf", {
          type: "application/pdf",
        });

        templateService.params.setPdfOutput(pdfFile);

        templateService.params.setIsTemplateUsed(false);
        this.baseIO.close();
      } else {
        console.error("File output not found");
      }
    });
  }

  onCreateTemplateProgress(templateService: TemplateService) {
    this.baseIO.on("create_template_progress", (data) => {
     templateService.params.setProgressValue(data)

    });
  }
}
