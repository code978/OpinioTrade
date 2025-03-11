// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../utils/authMiddleware');
const { createEvent, updateEvent, getAllTrades, settleTrades, manageUser } = require('../controllers/adminController');

router.use(authenticate, authorizeAdmin);

router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.get('/trades', getAllTrades);
router.post('/trades/settle/:eventId', settleTrades);
router.patch('/users/:userId', manageUser);

module.exports = router;