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
    phone : {
        type : String,
    },
    website : {
        type : String,
    },
    source : {
        type : String,
    }, 
    numberOfLastYearCrops : {
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
    block : {
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
    billingZip : {
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
    majorBuyer : {
        type : String,
    },
    totalAreaUnderCultivation : {
        type : Number,
    },
    familyMembers : {
        type : Number,
    },
    children : {
        type : Number,
    },
    cattles : {
        type : Array
    },
    annualIncome : {
        type : Number
    },
    scannedAadhar : {
        type : Number
    },
    bankName : {
        type : Number
    },
    ifsc : {
        type : Number
    },
    accountNumber : {
        type : Number
    }
});

const farmer = mongoose.model('farmer', FarmerSchema);
module.exports = farmer;