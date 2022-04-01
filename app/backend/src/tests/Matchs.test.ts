import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import { matchsMocks } from './mocks/matchs';

chai.use(chaiHttp);

const { expect } = chai;

  describe('/matchs', () => {
    let chaiHttpResponse: Response;

    describe('Match.findAll', () => {
      before(async () => {
        sinon
          .stub(Match, 'findAll')
          .resolves(matchsMocks.matchs as unknown as Match[]);
      });
    
      after(() => sinon.restore());

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
          expect(chaiHttpResponse.body).to.have.length(3);
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

   describe('Match.create', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, 'create')
        .resolves({ id: 4, ...matchsMocks.newMatch} as unknown as Match);
    });
  
    after(() => sinon.restore());
    
    it('Should return a new match created', async () => {
        chaiHttpResponse = await chai
         .request(app)
         .post('/matchs')
         .send(matchsMocks.newMatch);

         expect(chaiHttpResponse.body).to.have.property('id');
         expect(chaiHttpResponse.body).to.have.property('homeTeam');
         expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
         expect(chaiHttpResponse.body).to.have.property('awayTeam');
         expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
         expect(chaiHttpResponse.body).to.have.property('inProgress');
      });
   });

   describe('Match.finishMatch', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1] as any);
    });
  
    after(() => sinon.restore());


    it('Should return status 200', async () => {
      chaiHttpResponse = await chai
       .request(app)
       .patch('/matchs/1/finish');

       expect(chaiHttpResponse).to.have.status(200);
    });

    it('Should return "Finish" message', async () => {
        chaiHttpResponse = await chai
         .request(app)
         .patch('/matchs/1/finish');

         expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Finish' });
      });
   });

   describe('Match.updateMatch', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1] as any);
      sinon
        .stub(Match, 'findByPk')
        .resolves(matchsMocks.matchs[0] as unknown as Match)
    });
  
    after(() => sinon.restore());

    it('Should return status 200', async () => {
      chaiHttpResponse = await chai
       .request(app)
       .patch('/matchs/1');

       expect(chaiHttpResponse).to.have.status(200);
    });

    it('Should return the updated match', async () => {
        chaiHttpResponse = await chai
         .request(app)
         .patch('/matchs/1');

         expect(chaiHttpResponse.body).to.be.deep.eq(matchsMocks.matchs[0]);
      });
   });
  });
