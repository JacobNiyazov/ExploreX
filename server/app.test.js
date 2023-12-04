const {app, server} = require('./app.js'); 
const mongoose = require("mongoose");
const request = require('supertest');
const path = require('path');

let token = ""
describe('Test Map Controller', () => {
  
  it('Login dummy user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({username: "mapTest", password: "Test12345"});

    expect(response.status).toBe(200);
    token = response.headers['set-cookie']
  })

  let id = 0;
  it('Tests successful POST /api/map -- Create Map', async () => {
    let query = {
      'ownerUsername': 'mapTest',
      'mapType': 'Heat Map',
      'publishDate': Date.now(),
      'fileType': 'geojson',
      'property': 'id'
    }

    const response = await request(app)
      .post('/api/map')
      .query(query)
      .set("Cookie", token)
      .attach('file', path.resolve(__dirname, './ExampleData/poland.geojson.json'));

    expect(response.status).toBe(201);
    id = response.body.map._id
    expect(response.body).toHaveProperty('map');
  });

  let mapRes = ""
  it('Tests successful GET /api/map/${id} -- Get Map by Id', async () => {
    const response = await request(app)
      .get(`/api/map/${id}`)
      .set("Cookie", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('map');
    mapRes = response.body;
  });

  it('Tests successful POST /api/map/${id} -- Fork Map', async () => {
    const response = await request(app)
      .post(`/api/map/${id}`)
      .set("Cookie", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('map');
  });
  
  it('Tests successful PUT /api/map/${id} -- Edit Map by Id', async () => {
    const response = await request(app)
      .put(`/api/map/${id}`)
      .send(mapRes)
      .set("Cookie", token);
    
    expect(response.status).toBe(200);
  });

  it('Tests successful DELETE /api/map/${id} -- Delete Map', async () => {
    const response = await request(app)
      .delete(`/api/map/${id}`)
      .set("Cookie", token);

    expect(response.status).toBe(200);
  });
  
  it('Tests successful GET /api/usermapidpairs -- Get Map User Pairs', async () => {
    const response = await request(app)
      .get(`/api/usermapidpairs/`)
      .set("Cookie", token)
      .query({title: ""});

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('idNamePairs');
  });

  it('Tests successful GET /api/publicmapidpairs -- Get Public Map User Pairs', async () => {
    const response = await request(app)
      .get(`/api/publicmapidpairs/`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('idNamePairs');
  });
});

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
        user: {
          "__v": 0,
          "_id": expect.any(String),
          "bio": "I'm a new user!",
          "createdAt": expect.any(String),
          "email": "tester1234@gmail.com",
          "mapsOwned": [],
          "passwordHash": expect.any(String),
          "updatedAt": expect.any(String),
          "username": "tester1234"},
    });
  });
});

describe('Recover password tests', function(){
  it('should test POST /auth/forgotPassword with incorrect email', async() =>{
    let reqURL = '/auth/forgotPassword/';
    const response = await request(app)
      .post(reqURL)
      .send({ email: 'nowaythisexists@gmail.com'});
    expect(response.statusCode).toBe(401);
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
        email: 'tester1234@gmail.com',
        bio: "I'm a new user!",
        passwordHash: expect.any(String),
        mapsOwned: [],
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt:  expect.any(String),
        __v: 0
      }
    });
  });
});


describe('Edit Account details tests', function(){
  // let token = ""
  // it('Login dummy user', async () => {
  //   const response = await request(app)
  //     .post('/auth/login')
  //     .send({username: "testBack", password: "password"});

  //   expect(response.status).toBe(200);
  //   token = response.headers['set-cookie']
  // })
  it('should test successful PUT /user/editAccount/${id}', async() =>{
    let reqURL = '/user/editAccount/' + '65579dea673cb2142388bd46'
    let response = await request(app)
      .put(reqURL).set("Cookie", token)
      .send({ username: 'backtest', email: 'bt1@yahoo.com', bio:'', password:'password'});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        success: true,
        id: expect.any(String),
        message: 'User details updated successfully!',
        user: {
          "__v": expect.any(Number),
          "_id": '65579dea673cb2142388bd46',
          "bio": "",
          "createdAt": expect.any(String),
          "email": "bt1@yahoo.com",
          "mapsOwned": expect.any(Array),
          "passwordHash": expect.any(String),
          "updatedAt": expect.any(String),
          "username": "backtest"}
    });
    response = await request(app)
      .put(reqURL).set("Cookie", token)
      .send({ username: 'testBack', email: 'bt2@yahoo.com', bio:'', password:'password'});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        success: true,
        id: expect.any(String),
        message: 'User details updated successfully!',
        user: {
          "__v": expect.any(Number),
          "_id": '65579dea673cb2142388bd46',
          "bio": "",
          "createdAt": expect.any(String),
          "email": "bt2@yahoo.com",
          "mapsOwned": expect.any(Array),
          "passwordHash": expect.any(String),
          "updatedAt": expect.any(String),
          "username": "testBack"}
    });
  });

  it('should test PUT /user/editAccount/${id} with non-unique email', async() =>{
    let reqURL = '/user/editAccount/' + '65579dea673cb2142388bd46'
    const response = await request(app)
      .put(reqURL).set("Cookie", token)
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
      .put(reqURL).set("Cookie", token)
      .send({ username: 'explorer', email: 'dsfsdvsd@yahoo.com', bio:'', password:'password'});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        success: false,
        errorMessage: "An account with this username already exists."
    });
  });


});

describe('Create Map tests', function(){
  // let token = ""
  // it('Login dummy user', async () => {
  //   const response = await request(app)
  //     .post('/auth/login')
  //     .send({username: "testBack", password: "password"});

  //   expect(response.status).toBe(200);
  //   token = response.headers['set-cookie']
  // })

  it('should test successful Dot Distribution POST /api/map/', async() =>{
    let reqURL = '/api/map'
    let query = {
      'ownerUsername': 'mapTest',
      'mapType': 'Dot Distribution Map',
      'publishDate': Date.now(),
      'fileType': 'geojson',
      'property': 'id'
    }
    let response = await request(app).post(reqURL).set("Cookie", token)
    .query(query)
    .attach('file', path.resolve(__dirname, './ExampleData/poland.geojson.json'))
    .expect(201) // Adjust according to the expected response status
    .then(response => {
      expect(response.body.map.type).toBe('Dot Distribution Map');
    });
  });
  it('should test successful Spike Map POST /api/map/', async() =>{
    let reqURL = '/api/map'
    let query = {
      'ownerUsername': 'mapTest',
      'mapType': 'Spike Map',
      'publishDate': Date.now(),
      'fileType': 'geojson',
      'property': 'id'
    }
    let response = await request(app).post(reqURL).set("Cookie", token)
    .query(query)
    .attach('file', path.resolve(__dirname, './ExampleData/poland.geojson.json'))
    .expect(201) // Adjust according to the expected response status
    .then(response => {
      expect(response.body.map.type).toBe('Spike Map');
    });
  });
  it('should test successful Voronoi Map POST /api/map/', async() =>{
    let reqURL = '/api/map'
    let query = {
      'ownerUsername': 'mapTest',
      'mapType': 'Voronoi Map',
      'publishDate': Date.now(),
      'fileType': 'geojson',
      'property': 'id'
    }
    let response = await request(app).post(reqURL).set("Cookie", token)
    .query(query)
    .attach('file', path.resolve(__dirname, './ExampleData/voronoiExample.json'))
    .expect(201) // Adjust according to the expected response status
    .then(response => {
      expect(response.body.map.type).toBe('Voronoi Map');
    });
  });
  it('should test successful Heat Map POST /api/map/', async() =>{
    let reqURL = '/api/map'
    let query = {
      'ownerUsername': 'mapTest',
      'mapType': 'Heat Map',
      'publishDate': Date.now(),
      'fileType': 'geojson',
      'property': 'id'
    }
    let response = await request(app).post(reqURL).set("Cookie", token)
    .query(query)
    .attach('file', path.resolve(__dirname, './ExampleData/poland.geojson.json'))
    .expect(201) // Adjust according to the expected response status
    .then(response => {
      expect(response.body.map.type).toBe('Heat Map');
    });
  });
  it('should test successful POST Choropleth Map /api/map/', async() =>{
    let reqURL = '/api/map'
    let query = {
      'ownerUsername': 'mapTest',
      'mapType': 'Choropleth Map',
      'publishDate': Date.now(),
      'fileType': 'geojson',
      'property': 'id'
    }
    let response = await request(app).post(reqURL).set("Cookie", token)
    .query(query)
    .attach('file', path.resolve(__dirname, './ExampleData/poland.geojson.json'))
    .expect(201) // Adjust according to the expected response status
    .then(response => {
      expect(response.body.map.type).toBe('Choropleth Map');
    });
  });
  


  afterAll(async ()=>{
    await server.close();
    await mongoose.disconnect();
  });

});