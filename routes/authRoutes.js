const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getProfile);

module.exports = router;