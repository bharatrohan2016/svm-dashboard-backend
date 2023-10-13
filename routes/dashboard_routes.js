const express = require('express');
const { totalItems } = require('../controllers/dashboard_controllers');
const router = express.Router(); 
const protect = require('../middlewares/authMiddleware')


router.get('/totalitems', protect, totalItems)


module.exports = router;