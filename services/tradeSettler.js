const cron = require('node-cron');
const Event = require('../models/Event');
const Trade = require('../models/Trade');
const User = require('../models/User');

cron.schedule('*/10 * * * *', async () => {
  const completedEvents = await Event.find({ 
    endTime: { $lte: new Date() }, 
    status: 'completed' 
  });

  completedEvents.forEach(async (event) => {
    const trades = await Trade.find({ marketId: { $in: event.markets } });
    trades.forEach(async (trade) => {
      if (trade.predictedOutcome === event.outcome) {
        await User.findByIdAndUpdate(trade.userId, 
          { $inc: { balance: trade.payout } });
        trade.status = 'won';
      } else {
        trade.status = 'lost';
      }
      await trade.save();
    });
  });
});