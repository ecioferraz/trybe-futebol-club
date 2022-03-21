import { Application } from 'express';
import ClubsController from '../controllers/Clubs';
import CommonRoutesConfig from './common.routes.config';

export default class LeaderboardsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'LeaderboardsRoutes');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app.get('/leaderboard/home', ClubsController.getAll);

    return this.app;
  }
}
