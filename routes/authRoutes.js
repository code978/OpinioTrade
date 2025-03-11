const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile
} = require('../controllers/authController');
const { VailidateToken } = require('../utils/validateToken');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', VailidateToken, getProfile);

module.exports = router;