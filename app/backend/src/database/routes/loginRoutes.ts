import { Application } from 'express';
import LoginController from '../controllers/LoginController';
import CommonRoutesConfig from './common.routes.config';
import { authToken } from '../auth/jwt';
import Middlewares from '../middlewares';

export default class LoginRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app);
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app
      .post('/login', Middlewares.validateLogin, LoginController.login)
      .get('/login/validate', authToken, LoginController.getRole);

    return this.app;
  }
}
