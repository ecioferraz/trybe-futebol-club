// ref https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1

import { Application } from 'express';

export default abstract class CommonRoutesConfig {
  constructor(public app: Application) {
    this.configureRoutes();
  }

  public abstract configureRoutes(): Application;
}
