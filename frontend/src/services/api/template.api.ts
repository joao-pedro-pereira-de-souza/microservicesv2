
import { AxiosInstance } from 'axios';


interface ResponseList {
  items?: any
}

interface UseParams {
  template_url: string;
  variables: object;
}

interface ResponseUse {
  items: Items
}

export interface Items {
  id: string;
  name: string;
  data: Data;
  opts: Opts;
  progress: number;
  delay: number;
  timestamp: number;
  attemptsMade: number;
  stacktrace: any[];
  returnvalue: any;
  debounceId: any;
  finishedOn: any;
  processedOn: any;
}

export interface Data {
  template_url: string;
  variables: Variables;
}

export interface Variables {
  name: string;
}

export interface Opts {
  attempts: number;
  delay: number;
  timestamp: number;
}


export class TemplateApi {
  prefix = "/templates";
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async list(): Promise<ResponseList> {
    const url = this.prefix;

    const response = await this.axiosInstance.get(url);

    return await response.data;
  }

  async use(params: UseParams): Promise<ResponseUse> {
    const url = `${this.prefix}/use`;

    const response = await this.axiosInstance.post(url, params);

    return response.data;
  }
}
