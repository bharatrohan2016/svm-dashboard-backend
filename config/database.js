const mongoose = require('mongoose');
const { importFarmerCSVToMongoDB, importCropCSVToMongoDB, importSurveyCSVToMongoDB } = require('../utils/csvTojson'); 
const path = require('path')

const conn_url = process.env.MONGOOSE_URI;
// const conn_url = process.env.MONGOOSE_LOCAL;

const filepath = path.join(__dirname, '..', 'public', 'farmerdetails.csv')
const cropFilePath = path.join(__dirname, '..', 'public', 'crop.csv')
const surveyFilePath = path.join(__dirname, '..', 'public', 'survey.csv')



const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    // importFarmerCSVToMongoDB(filepath)
    // importCropCSVToMongoDB(cropFilePath)
    // importSurveyCSVToMongoDB(surveyFilePath)
    console.log('Connected');
    
})
.catch((err) => {console.log(err)})

module.exports = db;
