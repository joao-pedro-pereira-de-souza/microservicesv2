interface Item {
  id: string;
  url: string;
  base: string;
}

interface DataGet {
  items: Item[];
}

export class StorageTemplate {
  name = "templates";

  set(value: string) {
    localStorage.setItem(this.name, value);
  }

  get() {
    const items = JSON.parse(localStorage.getItem(this.name) as string);
    return items as DataGet;
  }

  remove() {
    localStorage.removeItem(this.name);
  }
}
