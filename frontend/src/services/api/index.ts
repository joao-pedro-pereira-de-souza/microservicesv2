import {TemplateApi} from './template.api'
export class Api {
  constructor(public readonly template: TemplateApi) {}
   static instance() {
      const templateApi = new TemplateApi();

      return new Api(templateApi)
  }
}
