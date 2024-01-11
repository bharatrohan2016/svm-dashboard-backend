const mongoose = require('mongoose');

// const conn_url = Your Mongodb URI

const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Mongo DB Connected Successfully'))
.catch((err) => {console.log(err)})

module.exports = db;
