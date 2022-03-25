import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { loginMocks } from './mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
   let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(User, 'findOne')
       .resolves(loginMocks.modelResponse as User);
   });
 
   after(() => sinon.restore());
 
   it('Checks if email is valid', async () => {
     const { email } = loginMocks.invalidLogin;
     const { password } = loginMocks.validAdminLogin;

     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email, password });

     expect(chaiHttpResponse).to.have.status(401);
     expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
   });

  it('Checks if password is valid', async () => {
    const { email } = loginMocks.validAdminLogin;
    const { password } = loginMocks.invalidLogin;

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email, password });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('Checks if login is successful', async () => {
    const { email, password } = loginMocks.validAdminLogin;

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email, password });

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Checks if /login/validate returns the user\'s role', async () => {
    const { email, password } = loginMocks.validAdminLogin;

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .send({ email, password })
      .set('Authorization', loginMocks.token);

      expect(chaiHttpResponse.body).to.be.eq(loginMocks.modelResponse.role);
  });
});
