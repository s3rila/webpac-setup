import { Data } from "./components/data";

export class App {
  data: Data;

  constructor() {
    this.data = Data.getInstance();
  }

  init(): void {}
}
