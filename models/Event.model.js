const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    startTime: Date,
    endTime: Date,
    status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
    outcome: String
});

module.exports = mongoose.model('Event', eventSchema);