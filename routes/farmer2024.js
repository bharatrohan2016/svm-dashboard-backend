const express = require('express');
const { findFarmer, filterFarmer, totalItems, getOneFarmer, cropwiseFarmernumber } = require('../controllers/farmer2024_controller');
const router = express.Router(); 
const protect = require('../middlewares/authMiddleware')

router.get('/farmer-2024', protect, findFarmer)
router.get('/filter-farmer-2024', protect, filterFarmer)
router.get('/totalitems-2024', protect, totalItems)
router.get('/get-single-farmer-2024/:id', protect, getOneFarmer)
router.get('/cropwise-farmers-number', protect, cropwiseFarmernumber)

module.exports = router;