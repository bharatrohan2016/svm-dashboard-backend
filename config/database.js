const mongoose = require('mongoose');
const { importFarmerCSVToMongoDB,importFarmerFatherNameCSVToMongoDB, importCropCSVToMongoDB, importSurveyCSVToMongoDB, importPolygonToMongoDB } = require('../utils/csvTojson'); 
const path = require('path');
const { streamKMLFile, calculatePolygonArea } = require('../utils/kmlProcessing');

const conn_url = process.env.MONGOOSE_URI;
// const conn_url = process.env.MONGOOSE_LOCAL;

const farmerfilepath = path.join(__dirname, '..', 'public', 'farmerListForFather.csv')
const cropFilePath = path.join(__dirname, '..', 'public', 'crop.csv')
const surveyFilePath = path.join(__dirname, '..', 'public', 'survey2-Paddy.csv');
const polygonFilePath = path.join(__dirname, '..', 'public', 'polygons.csv')



const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(async () => {
    // importFarmerCSVToMongoDB(farmerfilepath)
    //    importFarmerFatherNameCSVToMongoDB(farmerfilepath)
    // importCropCSVToMongoDB(cropFilePath)
    // importSurveyCSVToMongoDB(surveyFilePath)
    // importPolygonToMongoDB(polygonFilePath)
    // const coordinates = await streamKMLFile("https://drive.google.com/file/d/1OXpHqY5p2oXdQVUf8_irCwyyVrmeTv46/view")
    
    // const area = await calculatePolygonArea(coordinates);
    
    console.log('Connected');
})
.catch((err) => {console.log(err)})

module.exports = db;
