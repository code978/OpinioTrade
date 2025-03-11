const Trade = require('./../models/Trade.model');
const User = require('./../models/User.model');

exports.placeTrade = async (req, res) => {
  try {
    const { marketId, amount, predictedOutcome } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const trade = await Trade.create({
      user: user._id,
      market: marketId,
      amount,
      predictedOutcome
    });

    user.balance -= amount;
    await user.save();

    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user.userId })
      .populate('market')
      .populate('event');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};