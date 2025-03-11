const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  marketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
  amount: Number,
  predictedOutcome: String,
  status: { type: String, enum: ['open', 'won', 'lost'], default: 'open' },
  payout: Number
});

const Trade = mongoose.model('Trade', tradeSchema);
module.exports = Trade;