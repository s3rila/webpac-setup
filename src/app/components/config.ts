export class Config {
  private static instance: Config;
  private constructor() {}

  static getInstance() {
    //singleton
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}
