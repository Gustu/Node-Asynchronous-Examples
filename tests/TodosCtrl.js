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
  var data = ['hell', 'promises', 'async', 'highland'];

  before((done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach((done) => {
    Todo.remove().then(() => {
      done()
    });
  });

  data.forEach((method) => {
    it('should correctly create Todo with ' + method, (done) => {
      var body = {
        text: 'Todo Todo'
      };
      request(app.server)
        .post('/api/' + method + '/todos')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200) //Status code
        .end((err, res) => {
          if (err)
            throw err;
          res.body.should.have.property('text');
          res.body.should.have.property('done');
          done();
        });
    });

    it('should get all Todos with ' + method, (done) => {
      Todo.create([{text: "todo"}, {text: "todo"}]);
      request(app.server)
        .get('/api/' + method + '/todos')
        .expect('Content-Type', /json/)
        .expect(200) //Status code
        .end((err, res) => {
          if (err)
            throw err;
          res.body.should.be.instanceof(Array).and.have.lengthOf(2);
          done();
        });
    });

    it('should get one Todo with ' + method, (done) => {
      Todo.create({text: "todo"}).then((todo) => {
        request(app.server)
          .get('/api/' + method + '/todos/' + todo._id)
          .expect('Content-Type', /json/)
          .expect(200) //Status code
          .end((err, res) => {
            if (err)
              throw err;
            res.body.should.be.instanceof(Object).and.have.property('text');
            done();
          });
      });
    });

    it('should delete Todo with ' + method, (done) => {
      Todo.create({text: "todo"}).then((todo) => {
        request(app.server)
          .delete('/api/' + method + '/todos/' + todo._id)
          .expect(200) //Status code
          .end((err, res) => {
            if (err)
              throw err;
            done();
          });
      });
    });

  });
});
