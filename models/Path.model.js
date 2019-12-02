const mongoose = require('mongoose')

const GeoSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default:"Point"
        },
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }
    }
)
const PathSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    onduty:{
        type:Boolean,
        required:true,
    },
    request:{
        type:Boolean,
        required:true,
    },
    geometry: GeoSchema
});


module.exports = Path = mongoose.model('Path',PathSchema);