const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const path = require('path')

require("dotenv").config();

const app = express();
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL, // frontend URI (ReactJS)
  credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser())

// connect MongoDB
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//   const PORT = process.env.PORT || 8000
//   app.listen(PORT, () => {
//       console.log(`App is Listening on PORT ${PORT}`);
//   })
// }).catch(err => {
//   console.log(err);
// });

const PORT = process.env.PORT || 8000

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'))
})

// PUT THE SERVER IN LISTENING MODE
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


const Item = mongoose.model('Item', { name: String });

app.put('/api/items', async (req, res) => {
  try {
    const { name } = req.body;
    const item = new Item({ name });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// route
app.get("/api", (req, res) => {
    res.status(201).json({message: "Welcome& to Backend!"});
});

module.exports = {server,app}
