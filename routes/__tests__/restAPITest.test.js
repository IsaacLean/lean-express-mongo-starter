const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

describe('Questions API', () => {
  it('should create a question', done => {
    request(app)
      .post('/rest_api_test/questions')
      .send({ text: 'What is the best technology stack?' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get all questions', done => {
    request(app)
      .get('/rest_api_test/questions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get a specific question', done => {
    request(app)
      .post('/rest_api_test/questions')
      .send({ text: 'Why is the sky blue?' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const question = res.body;
        request(app)
          .get(`/rest_api_test/questions/${question._id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.eql(question);
            done();
          });
      });
  });

  it('should create an answer', done => {
    request(app)
      .post('/rest_api_test/questions')
      .send({ text: 'Which came first? The chicken or the egg?' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const question = res.body;
        request(app)
          .post(`/rest_api_test/questions/${question._id}/answers`)
          .send({ text: 'The chicken of course!' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an('object');
            done();
          });
      });
  });

  it('should update an answer', done => {
    request(app)
      .post('/rest_api_test/questions')
      .send({ text: 'What is your favorite operating system?' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const question = res.body;
        request(app)
          .post(`/rest_api_test/questions/${question._id}/answers`)
          .send({ text: 'Windows' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            const answer = res.body.answers[0];
            const newText = 'macOS';
            request(app)
              .put(`/rest_api_test/questions/${question._id}/answers/${answer._id}`)
              .send({ text: newText })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body.answers[0].text).to.equal(newText);
                done();
              });
          });
      });
  });

  it('should delete an answer', done => {
    request(app)
      .post('/rest_api_test/questions')
      .send({ text: 'What is not allowed as a pizza topping?' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const question = res.body;
        const text = 'Pineapple';
        request(app)
          .post(`/rest_api_test/questions/${question._id}/answers`)
          .send({ text: text })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            const answer = res.body.answers[0];
            request(app)
              .delete(`/rest_api_test/questions/${question._id}/answers/${answer._id}`)
              .send({ text: text })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.eql(question);
                done();
              });
          });
      });
  });

  it('should vote up an answer and vote down an answer', done => {
    request(app)
      .post('/rest_api_test/questions')
      .send({ text: 'Which fast food restaurant offers the best burgers?' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const question = res.body;
        request(app)
          .post(`/rest_api_test/questions/${question._id}/answers`)
          .send({ text: 'In-N-Out Burger' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            const firstAnswer = res.body.answers[0];
            request(app)
              .post(`/rest_api_test/questions/${question._id}/answers`)
              .send({ text: 'Shake Shack' })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(201)
              .end((err, res) => {
                if (err) return done(err);
                const secondAnswer = res.body.answers[0];
                request(app)
                  .post(`/rest_api_test/questions/${question._id}/answers/${firstAnswer._id}/vote-up`)
                  .set('Accept', 'application/json')
                  .expect('Content-Type', /json/)
                  .expect(200)
                  .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.answers[0].votes).to.equal(1);
                    request(app)
                      .post(`/rest_api_test/questions/${question._id}/answers/${secondAnswer._id}/vote-down`)
                      .set('Accept', 'application/json')
                      .expect('Content-Type', /json/)
                      .expect(200)
                      .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body.answers[1].votes).to.equal(-1);
                        done();
                      });
                  });
              });
          });
      });
  });
});
