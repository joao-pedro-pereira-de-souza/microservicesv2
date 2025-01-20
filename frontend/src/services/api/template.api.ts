
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
    // const mock = {
    //   page: 1,
    //   amount: 20,
    //   items: [
    //     {
    //       id: "ff52f64e-5f13-4fe9-ba4b-4bf9ee51743f",
    //       url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
    //     },
    //     {
    //       id: "4c5f5edb-5980-4651-b5a8-98443a4567d5",
    //       url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
    //     },
    //     {
    //       id: "e2a1f1a0-455e-4f41-8ac2-0e566510bb73",
    //       url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
    //     },
    //     {
    //       id: "8feb62e9-e480-48a1-998b-d3c57f221ef5",
    //       url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
    //     },
    //   ],
    // };

    // return mock;
  }

  async use(params: UseParams): Promise<ResponseUse> {
    const url = `${this.prefix}/use`;

    const response = await this.axiosInstance.post(url, params);

    return response.data;
  }
}
