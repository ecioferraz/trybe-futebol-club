import { Application } from 'express';
import MatchsController from '../controllers/Matchs';
import CommonRoutesConfig from './common.routes.config';

export default class MatchsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'MatchsRoutes');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app
      .get('/matchs', MatchsController.getAll)
      .post('/matchs', MatchsController.create)
      .patch('/matchs/:id/finish', MatchsController.finishMatch);

    return this.app;
  }
}
