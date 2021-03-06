import { Application } from 'express';
import MatchsController from '../controllers/MatchsController';
import Middlewares from '../middlewares';
import CommonRoutesConfig from './common.routes.config';

export default class MatchsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app);
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app
      .get('/matchs', MatchsController.getAll)
      .post('/matchs', Middlewares.checkEqualTeams, MatchsController.create)
      .patch('/matchs/:id', MatchsController.updateMatch)
      .patch('/matchs/:id/finish', MatchsController.finishMatch);

    return this.app;
  }
}
