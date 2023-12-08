const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GraphicsSchema = new Schema(
    {
        geojson: {type:Buffer, required: true},
        legend:{
            hideLegend: {type: Boolean, required: true},
            // legendFillColor: {type: String, required: true},
            // legendBorderColor: {type: String, required:true},
            // legendBorderWidth: {type: Number, required:true},
            legendTitle: {type: String, required: true},
            legendFields:[{
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
            dotPoints: {type: [[Object]], required:false},
            dotScale: {type: Number, required:false},
            property: {type: mongoose.Schema.Types.Mixed, required:false},
            spikeData: {type: [[Object]], required:false},
            spikeLegend: {type: [Number], required:false},
            chloroLegend: {type: Object, required:false},
        },
        stroke:{
            hasStroke: {type: Boolean, required: true},
            strokeColor:  {type: String, required: true},
            strokeWeight:  {type: Number, required: true},
            strokeOpacity: {type: Number, required: true},            
        },
        fill:{
            hasFill: {type: Boolean, required: true},
            fillColor:  {type: String, required: true},
            fillOpacity:  {type: Number, required: true},
        },
        text:{
            textColor: {type: String, required: true},
            textSize: {type: Number, required: true},
            textFont: {type: String, required: true}
        },
        ownerUsername:{type: String, required: true},
    }
)

module.exports = mongoose.model('Graphics', GraphicsSchema)