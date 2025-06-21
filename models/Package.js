const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageStars: Number,
  packageId: String,
  packageName: String,
  packagePlatform: String,
  packagePricing: Number,
  packsBought: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Package', packageSchema);
