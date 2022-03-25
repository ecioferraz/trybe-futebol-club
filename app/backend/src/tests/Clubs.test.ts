import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Club from '../database/models/Club';
import { clubMocks } from './mocks/clubs';


chai.use(chaiHttp);

const { expect } = chai;

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
        expect(chaiHttpResponse.body).to.have.length(16);
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
