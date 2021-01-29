const server = require('../');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { myDetails } = require('../utils/helpers');
const examples = require('./examples');

 
chai.should();
chai.use(chaiHttp);


describe("Test GET route /", () => {
  it("It should return my details successfully", (done) => {
      chai.request(server)
      .get('/')
      .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.deep.equal(myDetails);
      done();
      });
  });
});

describe('Test POST route /validate-rule', () => {
  it('shoould fail validation 1', (done) => {
    chai.request(server)
    .post('/validate-rule')
    .send(examples[0].request_payload)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.deep.equal(examples[0].response)
      done();
    })
  }),

  it('should fail validation 2', (done) => {
    chai.request(server)
    .post('/validate-rule')
    .send(examples[1].request_payload)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.deep.equal(examples[1].response)
      done();
    })
  }),

  it('should validate data successfully', (done) => {
    chai.request(server)
    .post('/validate-rule')
    .send(examples[2].request_payload)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.deep.equal(examples[2].response)
      done();
    })
  }),

  it('should send a response saying rule is required', (done) => {
    chai.request(server)
    .post('/validate-rule')
    .send(examples[3].request_payload)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.deep.equal(examples[3].response)
      done();
    })
  })
})