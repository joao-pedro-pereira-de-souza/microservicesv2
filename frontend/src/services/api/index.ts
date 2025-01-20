import axios from 'axios';
import { TemplateApi } from './template.api';
export class Api {


  constructor(public readonly template: TemplateApi) { }

  static instance() {
    console.log({
      domain: process.env.NEXT_PUBLIC_DOMAIN_URL_API ?? "http://localhost:2031",
    });
    const baseAxios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_DOMAIN_URL_API ?? "http://localhost:2031",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
      const templateApi = new TemplateApi(baseAxios);

      return new Api(templateApi)
  }
}
