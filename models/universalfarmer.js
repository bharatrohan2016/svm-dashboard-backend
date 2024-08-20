const mongoose = require('mongoose');
const UniversalFarmerSchema = mongoose.Schema({
    name : {
        type : String,
    },
    farmerId: {
        type: String,
    },
    fathersName : {
        type : String
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    adhaarpan: {
        type: String,
    },
    village: {
        type: String,
    },
    block: {
        type: String,
    },
    district: {
        type: String,
    },
    state: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    crops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UniversalCrop'
        }
    ],
    surveys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UniversalSurvey'
        }
    ]
},{
    timestamps: true
});

const Universalfarmer = mongoose.model('Universalfarmer', UniversalFarmerSchema);
module.exports = Universalfarmer;