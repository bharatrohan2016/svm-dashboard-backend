const express = require('express');
const { fetchPolygons } = require('../controllers/polygon_controllers');
const router = express.Router(); 
const protect = require('../middlewares/authMiddleware')


router.get('/polygons', fetchPolygons)


module.exports = router;