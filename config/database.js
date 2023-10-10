const mongoose = require('mongoose');

const conn_url = 'mongodb://0.0.0.0:27017/svw-dashboard'

const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Mongo DB Connected Successfully'))
.catch((err) => {console.log(err)})

module.exports = db;