const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware')
const userController = require('../controllers/user_controllers')

router.post('/register-user', userController.signUp)
router.post('/signin-user', userController.signIn)

module.exports = router;