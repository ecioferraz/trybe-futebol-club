import { Application } from 'express';
import LoginController from '../controllers/Login';
import CommonRoutesConfig from './common.routes.config';
import { validateLogin } from '../middlewares';
import { authToken } from '../auth/jwt';

export default class LoginRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'LoginRoutes');
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app.post('/login', validateLogin, LoginController.login);

    this.app.use(authToken);

    this.app.get('/login/validate', LoginController.getRole);

    return this.app;
  }
}
