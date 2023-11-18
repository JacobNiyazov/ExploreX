const { json } = require('body-parser')
const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MapSchema = new Schema(
    {
        title:{type: String, required: true},
        ownerUsername:{type: String, required: true},
        reactions: {
            comments: [{
                authorUsername: {type: String, required:true},
                comment:{type: String, required:true}
            }],
            likes: {type: Number},
            dislikes:{type: Number},
        },
        graphics:{type: Object, required: true},
        isPublic:{type: Boolean},
        type: {type: String, required: true},
        publishDate:{type: Date, default: new Date()},
    }
)
module.exports = mongoose.model('Map', MapSchema)