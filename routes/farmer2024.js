const express = require('express');
const { findFarmer, filterFarmer, totalItems, getOneFarmer } = require('../controllers/farmer2024_controller');
const router = express.Router(); 

router.get('/farmer-2024', findFarmer)
router.get('/filter-farmer-2024', filterFarmer)
router.get('/totalitems-2024', totalItems)
router.get('/get-single-farmer-2024/:id', getOneFarmer)

module.exports = router;