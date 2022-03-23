import * as express from 'express';
import * as cors from 'cors';
import ClubsRoutes from './database/routes/clubsRoutes';
import CommonRoutesConfig from './database/routes/common.routes.config';
import LoginRoutes from './database/routes/loginRoutes';
import MatchsRoutes from './database/routes/matchsRoutes';
import Middlewares from './database/middlewares';

class App {
  public app: express.Express;

  public routes: Array<CommonRoutesConfig> = [];
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();

    this.routes
      .concat(new LoginRoutes(this.app))
      .concat(new ClubsRoutes(this.app))
      .concat(new MatchsRoutes(this.app));

    this.app.use(Middlewares.error);
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    // ...
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`App listening at port ${PORT}!`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
