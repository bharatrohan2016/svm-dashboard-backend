const express = require('express');
const router = express.Router();

router.use('/user', require('./user_routes'));
router.use('/dashboard', require('./dashboard_routes'))

module.exports = router;