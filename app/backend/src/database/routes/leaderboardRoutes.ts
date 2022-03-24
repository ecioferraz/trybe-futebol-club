import { Application } from 'express';
import LeaderboardController from '../controllers/Leaderboard';
import CommonRoutesConfig from './common.routes.config';

export default class LeaderboardsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app);
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app.get('/leaderboard/home', LeaderboardController.getAll)
      .get('/leaderboard/away', LeaderboardController.getAll);

    return this.app;
  }
}
