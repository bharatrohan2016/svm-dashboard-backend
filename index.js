const express = require('express')
const PORT = 3200 | process.env.PORT;
const app = express()
const cors = require('cors')

const router = require('./routes')
const farmerRoutes = require('./routes/farmer_routes');
const testRoutes  = require('./routes/test_routes');
const polygonRoutes  = require('./routes/polygon_routes');
const farmer2024 = require('./routes/farmer2024')
require('dotenv').config()
const db = require('./config/database')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', router)
app.use('/api', farmerRoutes);
app.use('/api', testRoutes);
app.use('/api', farmer2024)
app.use('/api', polygonRoutes);


app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
})