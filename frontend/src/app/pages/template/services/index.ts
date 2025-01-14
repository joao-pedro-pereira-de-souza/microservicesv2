import { Dispatch, SetStateAction } from "react";


interface Input {
  urlPdf: string;
  variables: object;
  setIsTemplateUsed: Dispatch<SetStateAction<boolean>>;
  setProgressValue: Dispatch<SetStateAction<number>>;
  setPdfOutput: Dispatch<SetStateAction<string>>;
}
export class TemplateService {

  constructor(private readonly params: Input) {}

  handleUseTemplate() {
    console.log({ variables: JSON.stringify(this.params.variables) });
  }
}
