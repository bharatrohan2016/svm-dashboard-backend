const mongoose = require('mongoose')
const mapSchema = mongoose.Schema({
    excel_id: {
        type: String,
    },
    feild_number: {
        type: String,
    },
    area: {
        type: String,
    },
    geometry: {
        type: String
    },
    long: {
        type: Number,
    },
    lat: {
        type: Number,
    },
    farmer_name: {
        type: String
    },
    village: {
        type: String
    }
})

const Maps = mongoose.model('Maps', mapSchema)
module.exports = Maps;