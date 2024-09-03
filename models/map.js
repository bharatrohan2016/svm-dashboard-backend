const mongoose = require('mongoose');


const mapSchema = mongoose.Schema({
    excel_id: {
        type: String,
    },
    area: {
        type: Number,
    },
    crop_name : {
        type: String,
    },
    polygons : {
        type: [[[Number]]],
        required : true
    },
    farmer_name: {
        type: String
    },
    village: {
        type: String
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields  
})

const Maps = mongoose.model('Maps', mapSchema)
module.exports = Maps;