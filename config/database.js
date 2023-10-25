const mongoose = require('mongoose');

const conn_url = 'mongodb+srv://admin:admin@cluster0.ysw9m39.mongodb.net/?retryWrites=true&w=majority'

const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Mongo DB Connected Successfully'))
.catch((err) => {console.log(err)})

module.exports = db;