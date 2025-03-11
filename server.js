const http = require('http');
const socketio = require('socket.io');
const app = require('./app');
const Event = require('./models/Event.model');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  
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