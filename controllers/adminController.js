const Event = require('./../models/Event.model');
const Trade = require('./../models/Trade.model');
const User = require('./../models/Trade.model');

exports.createEvent = async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;
    const event = await Event.create({
      name,
      startTime,
      endTime,
      status: 'upcoming'
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.settleTrades = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const trades = await Trade.find({ event: event._id });
    // Settlement logic here
    res.json({ message: 'Trades settled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;
    const event = await Event.findByIdAndUpdate(req.params.eventId, {
      name,
      startTime,
      endTime,
    }, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find().populate('user').populate('event');
    res.json(trades);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.manageUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, balance } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (role) user.role = role;
    if (balance !== undefined) user.balance = balance;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
