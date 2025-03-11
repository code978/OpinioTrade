const http = require('http');
const socketio = require('socket.io');
const app = require('./app');
const Event = require('./models/Event.model');
const Trade = require('./models/Trade.model');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Update events in real-time
  Event.watch().on('change', (data) => {
    if (data.operationType === 'update') {
      emitEventUpdate(data.documentKey._id);
    }
  });

  // Update trades in real-time
  Trade.watch().on('change', (data) => {
    if (data.operationType === 'update') {
      emitEventUpdate(data.documentKey.event);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Emit event updates
const emitEventUpdate = async (eventId) => {
  const event = await Event.findById(eventId).populate('markets');
  io.emit('eventUpdate', event);
};

module.exports = { server, emitEventUpdate };