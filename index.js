const express = require('express')
const PORT = 3000;
const app = express()
const cors = require('cors')
const db = require('./config/database')
const router = require('./routes')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
})