// ref https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1

import { Application } from 'express';

export default abstract class CommonRoutesConfig {
  constructor(
    public app: Application,
    public _name: string,
  ) {
    this.configureRoutes();
  }

  public get name() {
    return this._name;
  }

  public abstract configureRoutes(): Application;
}
