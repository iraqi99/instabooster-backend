const mongoose = require('mongoose');

const boostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  boostStar: Number,
  boostOfFollower: Number,
  boostUsed: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Boost', boostSchema);
