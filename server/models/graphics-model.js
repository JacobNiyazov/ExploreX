const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GraphicsSchema = new Schema(
    {
        type: {type:String},
        features: [{
            type: {type: String},
            geometry: {
                type: {type: String},
                coordinates:{type: Object},
            },
            properties: {type: Object},
            id: {type: Number}
        }],
        ownerUsername:{type: String, required: true},
    }
)

module.exports = mongoose.model('Graphics', GraphicsSchema)