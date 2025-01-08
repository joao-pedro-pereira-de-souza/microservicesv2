import axios from 'axios'
export class UploadModule {


   static async download(url: string) {
      return (await axios.get(url, { responseType: 'arraybuffer' })).data as Buffer;
   }
}
