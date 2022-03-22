import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { loginMocks } from './mocks/login';
import Club from '../database/models/Club';
import { clubMocks } from './mocks/clubs';
import Match from '../database/models/Match';
import { matchsMocks } from './mocks/matchs';

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

describe('/clubs', () => {
   let chaiHttpResponse: Response;

   describe('ClubsService.getAll', () => {
     before(async () => {
       sinon
         .stub(Club, 'findAll')
         .resolves(clubMocks.getAll as Club[]);
     });
   
     after(()=> sinon.restore());
   
     it('Should return status 200', async () => {
       chaiHttpResponse = await chai
          .request(app)
          .get('/clubs');
  
       expect(chaiHttpResponse).to.have.status(200);
     });

     it('Should return an array of all teams', async () => {
       chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');

        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.have.length(5);
        expect(chaiHttpResponse.body[0]).to.have.property('id');
        expect(chaiHttpResponse.body[0]).to.have.property('clubName');
     });
   });

   describe('ClubsService.getById', () => {
     before(async () => {
       sinon
        .stub(Club, 'findByPk')
        .resolves(clubMocks.getAll[4] as Club);
     });

     after(() => sinon.restore())

     it('Should return status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/clubs/5');
 
      expect(chaiHttpResponse).to.have.status(200);
    });

     it('Should return the correct team', async () => {
       chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/5');

        expect(chaiHttpResponse.body.id).to.be.eq(clubMocks.getAll[4].id);
        expect(chaiHttpResponse.body.clubName).to.be.eq(clubMocks.getAll[4].clubName);
     });
   });
  });

  describe('/matchs', () => {
    let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Match, 'findAll')
       .resolves(matchsMocks.matchs as unknown as Match[]);
   });
 
   after(() => sinon.restore());

   describe('Match.findAll', () => {
     it('Should return status 200', async () => {
       chaiHttpResponse = await chai
        .request(app)
        .get('/matchs');

        expect(chaiHttpResponse).to.have.status(200);
     });

     it('Should return an array of all matchs', async () => {
       chaiHttpResponse = await chai
        .request(app)
        .get('/matchs');

        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.have.length(2);
        expect(chaiHttpResponse.body[0]).to.have.property('id');
        expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
        expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
        expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
        expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
        expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
        expect(chaiHttpResponse.body[0]).to.have.property('homeClub');
        expect(chaiHttpResponse.body[0].homeClub).to.have.property('clubName');
        expect(chaiHttpResponse.body[0]).to.have.property('awayClub');
        expect(chaiHttpResponse.body[0].awayClub).to.have.property('clubName');
     });
   });
  });
