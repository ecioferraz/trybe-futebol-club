import { Application } from 'express';
import ClubsController from '../controllers/Clubs';
import CommonRoutesConfig from './common.routes.config';

export default class ClubsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ClubsRoutes');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app.get('/clubs', ClubsController.getAll);

    this.app.get('/clubs/:id', ClubsController.getById);

    return this.app;
  }
}
