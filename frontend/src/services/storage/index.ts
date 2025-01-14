
import {StorageTemplate} from './templates'
export class Storage {
  public template: StorageTemplate;
  constructor() {
    this.template = new StorageTemplate();
  }

  clear() {
    localStorage.clear();
  }
}
