const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
console.log("HELLO!!!", process.env)
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .catch(e => {
        console.error('Database Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db