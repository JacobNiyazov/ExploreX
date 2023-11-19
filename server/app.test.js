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
describe('Login user tests', function(){
  it('should test POST /auth/login with incorrect password', async() =>{
    let reqURL = '/auth/login/';
    const response = await request(app)
      .post(reqURL)
      .send({ username: 'tester1234', password:'tester1234tester1234'});
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "Wrong username or password provided."
    });
  });
  it('should test POST /auth/login with incorrect username', async() =>{
    let reqURL = '/auth/login/';
    const response = await request(app)
      .post(reqURL)
      .send({ username: 'tester1234555', password:'tester1234'});
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "Wrong username or password provided."
    });
  });
  it('should test POST /auth/login with correct input', async() =>{
    let reqURL = '/auth/login/';
    const response = await request(app)
      .post(reqURL)
      .send({ username: 'tester1234', password:'tester1234'});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        success: true,
        username: 'tester1234',
    });
  });
});

describe('Recover password tests', function(){
  it('should test POST /auth/forgotPassword with incorrect email', async() =>{
    let reqURL = '/auth/forgotPassword/';
    const response = await request(app)
      .post(reqURL)
      .send({ email: 'nowaythisexists@gmail.com'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "An account with this email address does not exist."
    });
  });

  it('should test POST /auth/forgotPassword with no email', async() =>{
    let reqURL = '/auth/forgotPassword/';
    const response = await request(app)
      .post(reqURL)
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "Please enter an email."
    });
  });

  it('should test POST /auth/forgotPassword with right email', async() =>{
    let reqURL = '/auth/forgotPassword/';
    const response = await request(app)
      .post(reqURL)
      .send({ email: 'tester1234@gmail.com'});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "An email has been sent successfully."
    });
  });
});

describe('Delete user tests', function(){
  it('should test DELETE /auth/deleteAccount with existing user', async() =>{
    let reqURL = '/auth/deleteAccount';
    const response = await request(app)
      .delete(reqURL)
      .send({ email: 'tester1234@gmail.com'});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        success: true,
        message: "User deleted successfully."
    });
  });
  it('should test DELETE /auth/deleteAccount with non existing user', async() =>{
    let reqURL = '/auth/deleteAccount';
    const response = await request(app)
      .delete(reqURL)
      .send({ email: 'fakefakefake@gmail.com'});
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "User not found."
    });
  });
});


describe('Register user tests', function(){

  it('should test POST /auth/register for empty fields', async() =>{
    let reqURL = '/auth/register';
    const response = await request(app)
      .post(reqURL)
      .send({username: 'tester1234', password:'tester1234', passwordVerify: 'tester11234'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errorMessage: "Please enter all required fields."
    });
  });

  it('should test POST /auth/register for invalid email', async() =>{
    let reqURL = '/auth/register';
    const response = await request(app)
      .post(reqURL)
      .send({ email: 'mail.com', username: 'tester1234', password:'tester1234', passwordVerify: 'tester11234'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errorMessage: "Invalid email format, please try again."
    });
  });

  it('should test POST /auth/register for weak password', async() =>{
    let reqURL = '/auth/register';
    const response = await request(app)
      .post(reqURL)
      .send({ email: 'tester1234@gmail.com', username: 'tester1234', password:'123', passwordVerify: '123'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errorMessage: "Please enter a password of at least 8 characters."
    });
  });

  it('should test POST /auth/register for non matching passwords', async() =>{
    let reqURL = '/auth/register';
    const response = await request(app)
      .post(reqURL)
      .send({ email: 'tester1234@gmail.com', username: 'tester1234', password:'tester1234', passwordVerify: 'tester11234'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errorMessage: "Please enter the same password twice."
    });
  });

  it('should test POST /auth/register for successful input', async() =>{
    let reqURL = '/auth/register';
    const response = await request(app)
      .post(reqURL)
      .send({ email: 'tester1234@gmail.com', username: 'tester1234', password:'tester1234', passwordVerify: 'tester1234'});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      user: {
          username: 'tester1234',
          email: 'tester1234@gmail.com'            
      }
    });
  });
});

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