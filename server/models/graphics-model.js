const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GraphicsSchema = new Schema(
    {
        geojson: {
            type: {type:String, required: true},
            features: [{
                type: {type: String, required: true},
                geometry: {
                    type: {type: String, required: true},
                    coordinates:{type: Object, required: true},
                },
                properties: {type: Object, required: true},
                id: {type: Schema.Types.Mixed}
            }],
        },
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
        region:{
            fillColor: {type: String, required: true},
            borderColor: {type: String, required:true},
            borderWidth: {type: Number, required:true},
            size: {type: Number, required: true},
        },
        text:{
            color: {type: String, required: true},
            size: {type: Number, required: true},
            font: {type: String, required: true}
        },
        ownerUsername:{type: String, required: true},
    }
)

module.exports = mongoose.model('Graphics', GraphicsSchema)