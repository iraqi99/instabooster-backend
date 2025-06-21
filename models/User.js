const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  bio: String,
  followers: Number,
  followings: Number,
  isPrivate: Boolean,
  isVerified: Boolean,
  pk: String,
  createdAt: Date,
  stars: Number,
  isFirstLogin: Boolean,
});

module.exports = mongoose.model('User', userSchema);
