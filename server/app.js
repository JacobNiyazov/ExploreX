const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();

const app = express();

// connect MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  const PORT = process.env.PORT || 8000
  app.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
  })
}).catch(err => {
  console.log(err);
});

app.use(bodyParser.json());
const corsOptions = {
  origin: process.env.CLIENT_URL // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

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
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

module.exports = app