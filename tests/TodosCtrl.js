import 'babel-polyfill';
import should from 'should';
import assert from 'assert';
import request from 'supertest';
import mongoose from 'mongoose';
import config from 'config';
import Todo from '../models/todo';
import app from '../app';

describe('Todo', function () {
  var dbURI = config.get('dbConfig.host');

  before((done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach((done) => {
    Todo.remove().then(() => {
      done()
    });
  });

  it('should correctly create Todo', function (done) {
    var body = {
      text: 'Todo Todo'
    };
    request(app.server)
      .post('/api/hell/todos')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200) //Status code
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.have.property('text');
        res.body.should.have.property('done');
        done();
      });
  });
});
