import { Application } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import CommonRoutesConfig from './common.routes.config';

export default class LeaderboardRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app);
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app
      .get('/leaderboard', LeaderboardController.getAll)
      .get('/leaderboard/home', LeaderboardController.getAll)
      .get('/leaderboard/away', LeaderboardController.getAll);

    return this.app;
  }
}
