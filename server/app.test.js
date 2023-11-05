const request = require('supertest');
const app = require('./app.js'); 

describe('Backend API Tests', function(){
  it('should test GET /api/items', function(done) {
    request(app)
      .get('/api/items')
      .expect(200,done);
  });

  it('should test PUT /api/items', function(done) {
    request(app)
      .put('/api/items')
      .send({ name: 'test' })
      .expect(201, done);
  });
});