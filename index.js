const express = require('express')
const PORT = 3200 | process.env.PORT;
const app = express()
const cors = require('cors')

const router = require('./routes')
const farmerRoutes = require('./routes/farmer_routes');
const testRoutes  = require('./routes/test_routes');
require('dotenv').config()
const db = require('./config/database')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', router)
app.use('/api', farmerRoutes);
app.use('/api', testRoutes);


app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
})