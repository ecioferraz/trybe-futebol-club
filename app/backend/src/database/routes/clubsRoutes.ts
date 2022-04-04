import { Application } from 'express';
import ClubsController from '../controllers/ClubsController';
import CommonRoutesConfig from './common.routes.config';

export default class ClubsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app);
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app
      .get('/clubs', ClubsController.getAll)
      .get('/clubs/:id', ClubsController.getById);

    return this.app;
  }
}
