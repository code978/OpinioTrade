const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authMiddleware');
const {
  placeTrade,
  getUserTrades
} = require('../controllers/tradeController');

router.use(authenticate);

router.post('/', placeTrade);
router.get('/my-trades', getUserTrades);

module.exports = router;