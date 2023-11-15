const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        email: { type: String, required: true },
        bio: { type: String, required: false },
        passwordHash: { type: String, required: true },
        mapsOwned: [{type: Object, required: false}],
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
