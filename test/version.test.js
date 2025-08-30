const request = require('supertest');
const express = require('express');
const router = require('../routes/index');  
const app = express();
app.use('/', router);

describe('GET /', function() {
  it('should respond with status true and version 12', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ status: true, version: 12 }, done);
  });
});
