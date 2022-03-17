import { Application } from 'express';
import LoginController from '../controllers/Login';
import CommonRoutesConfig from './common.routes.config';
import { validateLogin } from '../middlewares';

export default class LoginRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'LoginRoutes');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app.route('/login')
      .post(validateLogin, LoginController.login);

    return this.app;
  }
}
