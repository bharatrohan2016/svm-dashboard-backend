const express = require('express');
const { findFarmer } = require('../controllers/farmer2024_controller');
const router = express.Router(); 

router.get('/farmer-2024', findFarmer)

module.exports = router;