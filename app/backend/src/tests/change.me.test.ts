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
  /**
   * Exemplo do uso de stubs com tipos
   */

   let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(User, "findOne")
       .resolves(loginMocks.modelResponse as User);
   });
 
   after(()=>{
     (User.findOne as sinon.SinonStub).restore();
   })
 
   it('checks email', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin'});
    // console.log(chaiHttpResponse);
     expect(chaiHttpResponse).to.have.status(200);
   });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
