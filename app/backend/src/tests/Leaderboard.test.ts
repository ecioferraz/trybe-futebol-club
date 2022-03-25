import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Club from '../database/models/Club';
import { clubMocks } from './mocks/clubs';

chai.use(chaiHttp);

const { expect } = chai;

  describe('/leaderboard', () => {
    let chaiHttpResponse: Response;

  describe('LeaderboardService.getAll', () => {
    before(async () => {
      sinon
        .stub(Club, 'findAll')
        .resolves(clubMocks.getAll as Club[]);
    });
  
    after(()=> sinon.restore());
  
    it('Should return status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard');
 
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Should return an array of team championship data', async () => {
      chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard');
       console.log(chaiHttpResponse.body.length);

       expect(chaiHttpResponse.body).to.be.an('array');
       expect(chaiHttpResponse.body).to.have.length(16);
       expect(chaiHttpResponse.body[0]).to.have.property('name');
       expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
       expect(chaiHttpResponse.body[0]).to.have.property('totalGames');
       expect(chaiHttpResponse.body[0]).to.have.property('totalVictories');
       expect(chaiHttpResponse.body[0]).to.have.property('totalDraws');
       expect(chaiHttpResponse.body[0]).to.have.property('totalLosses');
       expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor');
       expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn');
       expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance');
       expect(chaiHttpResponse.body[0]).to.have.property('efficiency');
    });
  });
});
