import { Config } from "./config";

export class Data {
  private static instance: Data;
  private constructor() {
    console.log(Config.getInstance());
  }

  static getInstance() {
    //singleton
    if (!Data.instance) {
      Data.instance = new Data();
    }
    return Data.instance;
  }
}
