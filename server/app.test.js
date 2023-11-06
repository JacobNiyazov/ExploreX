const {app, server} = require('./app.js'); 
const mongoose = require("mongoose");
const request = require('supertest');

describe('Backend API Tests', function(){

  it('should test GET /api/items', async() =>{
    await request(app)
      .get('/api/item')
      .expect(200);
  });

  it('should test PUT /api/items', async()=> {
    await request(app)
      .put('/api/items')
      .send({ name: 'test' })
      .expect(201);
  });
  afterAll(async ()=>{
    await server.close();
    await mongoose.disconnect();
  });
});

