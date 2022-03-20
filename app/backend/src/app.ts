import * as express from 'express';
// import { authToken } from './database/auth/jwt';
import midError from './database/middlewares/error';
import ClubsRoutes from './database/routes/clubsRoutes';
import CommonRoutesConfig from './database/routes/common.routes.config';
import LoginRoutes from './database/routes/loginRoutes';
import MatchsRoutes from './database/routes/matchsRoutes';

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

    // this.app.use(authToken);

    this.routes
      .concat(new ClubsRoutes(this.app))
      .concat(new MatchsRoutes(this.app));

    this.app.use(midError);

    this.app.listen(PORT, () => console.log(`App listening at port ${PORT}!`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
