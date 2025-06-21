const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  feedId: mongoose.Schema.Types.ObjectId,
  reward: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Follow', followSchema);
