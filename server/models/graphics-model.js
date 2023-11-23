const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GraphicsSchema = new Schema(
    {
        geojson: {type:String, required: true},
        legend:{
            hideLegend: {type: Boolean, required: true},
            fillColor: {type: String, required: true},
            borderColor: {type: String, required:true},
            borderWidth: {type: Number, required:true},
            title: {type: String, required: true},
            fields:[{
                fieldColor:{type: String, required: true},
                fieldText:{type: String, required: true}
            }]
        },
        typeSpecific:{
            selectAll: {type: Boolean, required: true},
            size: {type: Number, required: true},
            dotColor: {type: String, required: true},
            color: {type:String, required: true},
            range:{type: Number, required: true},
            spikeColor: {type: String, required: true},
        },
        ownerUsername:{type: String, required: true},
    }
)

module.exports = mongoose.model('Graphics', GraphicsSchema)