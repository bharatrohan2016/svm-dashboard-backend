const mongoose = require('mongoose');
const importCSVToMongoDB = require('../utils/csvTojson'); 
const path = require('path')

const conn_url = process.env.MONGOOSE_LOCAL;

const filepath = path.join(__dirname, '..', 'public', 'test.csv')
console.log(filepath);



const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    importCSVToMongoDB(filepath)
    console.log('Connected');
    
})
.catch((err) => {console.log(err)})

module.exports = db;
