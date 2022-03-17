import * as express from 'express';
import midError from './database/middlewares/error';
import CommonRoutesConfig from './database/routes/common.routes.config';
import LoginRoutes from './database/routes/loginRoutes';

class App {
  public app: express.Express;

  public routes: Array<CommonRoutesConfig> = [];
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...
  }

  // ...
  public start(PORT: string | number): void {
    this.app.use(express.json());
    this.routes
      .push(new LoginRoutes(this.app));

    this.app.use(midError);

    this.app.listen(PORT, () => console.log(`App listening at port ${PORT}!`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
