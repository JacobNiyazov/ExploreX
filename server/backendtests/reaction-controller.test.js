const {app, server} = require('../app.js'); 
const mongoose = require("mongoose");
const request = require('supertest');
const reactionRouter = require('../routes/reaction-router.js');

const generateDummyMap = () => {
  return {
    _id: 'dummyMapId',
    creationDate: Date.now,
    description:"hello this is the caption",
    graphics: null,
    isPublic: false,
    name: "test map",
    owner: generateDummyUser,
    reactions: [],
    type:"Voronoi"
  };
};

// Create a function to generate dummy map data
const generateDummyUser = () => {
  return {
    _id: 'dummyUserId',
    creationDate: Date.now,
    email: "teampink@sbu.edu",
    mapsOwned: [generateDummyMap],
    name:"team pink",
    password:"123123123",
    username:"cse416"
  };
};
app.use('/reactions',reactionRouter);
describe('Reaction Controller', () => {
  beforeAll((done) => {
    server.on('listening', () => done());
  });
  it('should create a reaction', async () => {
    //const auth = require('../auth/index')
    const dummyUser = generateDummyUser();
    const dummyMap = generateDummyMap();
    const response = await request(app)
      .post('/reactions/reaction')
      .set('Cookie', [`token= ${dummyUser._id}`]) // Assuming you pass the token in the Authorization header
      .send({
        mapId: dummyMap._id,
        isLike: true,
        data: 'Some reaction data',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('reaction');
    expect(response.body.reaction).toHaveProperty('map', dummyMap._id);
    expect(response.body.reaction).toHaveProperty('isLike', true);
  });
  afterAll(async ()=>{
    await server.close();
  });
});