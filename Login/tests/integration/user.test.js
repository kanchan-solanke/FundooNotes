import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';


import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let jwtToken;

let notes_id;
//---------------DATABASE CONNECTION-----------------------------//
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  //------------------------USER REGISTRATION FOR POSTIVE DATA--------------------------//

  describe('POST / Users Registration', () => {
    it('Create User and Should return status 201', (done) => {
      const UserDetails = {
        firstName: 'Kanchan',
        lastName: 'Solanke',
        email: 'ks@gmail.com',
        password: 'ks123'
      };
      request(app)
        .post('/api/v1/users')
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });

    //------------USER REGISTRATION FOR NEGATIVE DATA-----------------------------//
    it('User credentials are incorrect and Should return status 400', (done) => {
      const UserDetails = {
        firstName: '1234',
        lastName: 'Solanke',
        email: 'ks@gmail.com',
        password: 'ks123'
      };
      request(app)
        .post('/api/v1/users')
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);

          done();
        });
    });
  });


  //----------------------------------USER LOGIN FOR POSITIVE DATA----------------------------------------//

  describe('POST / Users login', () => {
    it('When given EmailID and Password is correct return status 200', (done) => {
      const UserDetails = {
        email: 'ks@gmail.com',
        password: 'ks123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(UserDetails)
        .end((err, res) => {
          jwtToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


    //----------------------------------USER LOGIN FOR NEGATIVE DATA----------------------------------------//


    it('emailId is incorrect  then Should return status 400', (done) => {
      const UserDetails = {
        email: 123,
        password: 'ks123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);

          done();
        });
    });
  });


  //------------------------------------NOTES-------------------------------------------//

  //-------------------------------------------FOR CREATING NOTES --------------------------------------------------//
  //-----------------positive Data-----------------------//

  describe('POST / Create Notes', () => {
    it('Create Note and Should return status 200', (done) => {
      const UserDetails = {
        Title: 'TESTING API WITH MOCHA_CHAI',
        Descreption: 'Testing'
      };
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UserDetails)
        .end((err, res) => {
          notes_id = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);

          done();
        });
    });

    //------------------------------Negative Data-------------------------------//

    it('Invalid Token and Should return status 400', (done) => {
      const UserDetails = {
        Title: 'TESTING API WITH MOCHA_CHAI',
        Descreption: 'Testing'
      };
      request(app)
        .post('/api/v1/notes')
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });

  //---------------------------------GET ALL NOTES--------------------------------------------//
  //-------------------FOR POSITIVE DATA ---------------------------------------//

  describe('GET / Get All Notes', () => {
    it('Getting All Notes and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
        .get('/api/v1/notes/allNotes')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });

    //---------------------FOR NEGATIVE DATA ---------------------------//
    it('Invalid DATA and Should return status 401', (done) => {
      const UserDetails = {};
      request(app)
        .get('/api/v1/notes/allNotes')
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });

  })

  //-----------------------GET A SINGLE NOTE --------------------------//
  //-------------------------FOR POSITIVE DATA -----------------------//

  describe('GET / Get Single Note', () => {
    it('Getting Single Note and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
        .get(`/api/v1/notes/${notes_id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });

    //-----------------------FOR NEGATIVE DATA ----------------------------//
    it('Invalid Token and Should return status 401', (done) => {
      const UserDetails = {};
      request(app)
        .get(`/api/v1/notes/${notes_id}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

          done();
        });
    });
  })


  //---------------------------------UPDATE NOTE ------------------------//
  //------------------FOR POSITIVE DATA -----------------------------//

  describe('PUT / Update Note', () => {
    it('Update Note and Should return status 201', (done) => {
      const UserDetails = {
        Title: 'TESTING API WITH MOCHA_CHAI',
        Descreption: 'Testing'
      };
      request(app)
        .put(`/api/v1/notes/${notes_id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);

          done();
        });
    });
  

  //--------------------------------FOR NEGATIVE DATA -----------------------------------//
  it('Invalid token and Should return status 401', (done) => {
    const UserDetails = {
      Title: 'TESTING API WITH MOCHA_CHAI',
      Descreption: 'Testing'
    };
    request(app)
      .put(`/api/v1/notes/${notes_id}`)
      .send(UserDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

        done();
      });
  });
})
  //--------------------------DELETE NOTE ---------------------------------------//
  //----------------FOR POSITIVE DATA ------------------//
  describe('DELETE / Delete Note', () => {

    it('Delete Note and Should return status 201', (done) => {
      const UserDetails = {};
      request(app)
        .delete(`/api/v1/notes/${notes_id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);

          done();
        });
    });

    //--------------------------FOR NEGATIVE DATA ----------------------//
    it('Invalid token and Should return status 401', (done) => {
      const UserDetails = {
        Title: 'TESTING API WITH MOCHA_CHAI',
        Descreption: 'Testing'
      };
      request(app)
        .delete(`/api/v1/notes/${notes_id}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
  
          done();
        });
    });
  })

  //---------------------------ARCHIEVE NOTES -----------------------------//
  describe('PUT / Archive Note', () => {
    it('Archive Note and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
        .put(`/api/v1/notes/${notes_id}/isArchieve`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);

          done();
        });
    });

    //----------------FOR NEGATIVE DATA --------------//
    it('Invalid Token and Should return status 401', (done) => {
      const UserDetails = {};
      request(app)
        .put(`/api/v1/notes/${notes_id}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

          done();
        });
    });
  });

  //------------------------TRASH ----------------------//
  //---------------FOR POSITIVE DATA -----------------------//
  describe('PUT / Trash Note', () => {
    it('Trash Note and Should return status 200', (done) => {
      const UserDetails = {};
      request(app)
        .put(`/api/v1/notes/${notes_id}/isDeleted`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);

          done();
        });
    });

    //------------------FOR NEGATIVE DATA-----------------------//

    it('Invalid Token and Should return status 401', (done) => {
      const UserDetails = {};
      request(app)
        .put(`/api/v1/notes/${notes_id}`)
        .send(UserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);

          done();
        });
    });

  })

})