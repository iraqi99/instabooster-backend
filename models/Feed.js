const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  username: String,
  followers: Number,
  followings: Number,
  stars: Number,
  pk: String,
  bio: String,
  fullName: String,
  isPrivate: Boolean,
  isVerified: Boolean,
  isFirstLogin: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feed', feedSchema);
