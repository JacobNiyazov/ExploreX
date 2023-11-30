const { json } = require('body-parser')
const { Int32, ObjectId } = require('mongodb')
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
        graphics:{type: ObjectId},
        isPublic:{type: Boolean},
        type: {type: String, required: true},
        publishDate:{type: Date, default: new Date()},
        imageBuffer: {type: String, required:false},

    }
)
module.exports = mongoose.model('Map', MapSchema)