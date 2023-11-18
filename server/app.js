const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const path = require('path')

require("dotenv").config();

const app = express();
// app.use(bodyParser.json());
app.use(express.json({ extended: true, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true}))
const corsOptions = {
  origin: process.env.CLIENT_URL, // frontend URI (ReactJS)
  credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser())

const PORT = process.env.PORT || 8000

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//const authRouter = require('./routes/auth-router')
//app.use('/auth', authRouter)
const mapRouter = require('./routes/map-router');
app.use('/api', mapRouter)
const graphicsRouter = require('./routes/graphics-router');
app.use('/api', graphicsRouter)

module.exports = {server,app}
