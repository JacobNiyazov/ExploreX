const {app, server} = require('./app.js'); 
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const request = require('supertest');

// describe('Backend API Tests', function(){

//   it('should test GET /api/items', async() =>{
//     await request(app)
//       .get('/api/items')
//       .expect(200);
//   });

//   it('should test PUT /api/items', async()=> {
//     await request(app)
//       .put('/api/items')
//       .send({ name: 'test' })
//       .expect(201);
//   });
//   afterAll(async ()=>{
//     await server.close();
//     await mongoose.disconnect();
//   });
// });

describe('Edit Account details tests', function(){
  it('should test successful PUT /user/editAccount/${id}', async() =>{
    let reqURL = '/user/editAccount/' + '65579dea673cb2142388bd46'
    let response = await request(app)
      .put(reqURL)
      .send({ username: 'backtest', email: 'bt1@yahoo.com', bio:'', password:'password'});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        success: true,
        id: expect.any(String),
        message: 'User details updated successfully!'
    });
    response = await request(app)
      .put(reqURL)
      .send({ username: 'testBack', email: 'bt2@yahoo.com', bio:'', password:'password'});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        success: true,
        id: expect.any(String),
        message: 'User details updated successfully!'
    });
  });

  it('should test PUT /user/editAccount/${id} with non-unique email', async() =>{
    let reqURL = '/user/editAccount/' + '65579dea673cb2142388bd46'
    const response = await request(app)
      .put(reqURL)
      .send({ username: 'cascacdd', email: 'explorer@gmail.com', bio:'', password:'password'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "An account with this email address already exists."
    });

  });

  it('should test PUT /user/editAccount/${id} with non-unique username', async() =>{
    let reqURL = '/user/editAccount/' + '65579dea673cb2142388bd46'
    const response = await request(app)
      .put(reqURL)
      .send({ username: 'explorer', email: 'dsfsdvsd@yahoo.com', bio:'', password:'password'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "An account with this username already exists."
    });

  });
  afterAll(async ()=>{
    await server.close();
    await mongoose.disconnect();
  });

});