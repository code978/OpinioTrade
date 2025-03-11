const cron = require('node-cron');
const Event = require('../models/Event');
const { emitEventUpdate } = require('../server');

// Mock data generator
const mockEvents = [];

cron.schedule('*/5 * * * *', async () => {
  const events = await Event.find({ status: { $ne: 'completed' } });
  events.forEach(async (event) => {
    // Update event status and mock odds
    event.status = calculateStatus(event);
    await event.save();
    emitEventUpdate(event._id);
  });
});