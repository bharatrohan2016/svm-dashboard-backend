const mongoose = require('mongoose')
const mapSchema = mongoose.Schema({
    excel_id: {
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
    feild_name: {
        type: String
    }
})

const Maps = mongoose.model('Maps', mapSchema)
module.exports = Maps;