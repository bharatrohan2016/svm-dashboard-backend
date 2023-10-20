const mongoose = require('mongoose');
const FarmerSchema = mongoose.Schema({
    name : {
        type : String,
    },
    fathersName : {
        type : String
    },
    parentAccount : {
        type : String,
    },
    feildId : {
        type : String,
    },
    phone : {
        type : String,
    },
    lat : {
        type : String,
    },
    long : {
        type : String,
    },
    surveyedArea : {
        type : String,
    },
    map1link : {
        type : String,
    },
    map2link : {
        type : String,
    },
    surveydate2 : {
        type : String,
    },
    surveydate1 : {
        type : String,
    },
    cellphoneAccess : {
        type : String,
    },
    website : {
        type : String,
    },
    source : {
        type : String,
    }, 
    cropsGrown : {
        type : String,
    }, 
    tehsil : {
        type : String,
    }, 
    block : {
        type : String,
    }, 
    post : {
        type : String,
    }, 
    village : {
        type : String,
    }, 
    district : {
        type : String,
    },
    billingStreet : {
        type : String,
    },
    billingCity : {
        type : String,
    },
    billingState : {
        type : String
    },
    billingZipCode : {
        type : String,
    },
    billingCountry : {
        type : String,
    },
    shippingStreet : {
        type : String,
    },
    shippingCity : {
        type : String,
    },
    shippingState : {
        type : String,
    },
    shippingCountry : {
        type : String,
    },
    shippingZipCode : {
        type : String,
    },
    majorBuyer : {
        type : String,
    },
    totalAreaUnderCultivation : {
        type : String,
    },
    familyMembers : {
        type : String,
    },
    children : {
        type : String,
    },
    cattles : {
        type : Array
    },
    annualIncome : {
        type : String
    },
    aadhaarNumber : {
        type : String
    },
    bankName : {
        type : String
    },
    ifsc : {
        type : String
    },
    accountNumber : {
        type : String
    },
    cropsArray : {
        type : Array
    }
},{
    timestamps: true
});

const farmer = mongoose.model('farmer', FarmerSchema);
module.exports = farmer;