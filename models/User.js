const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // مشفر باستخدام bcrypt
    required: true,
  },
  fullName: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  followers: {
    type: Number,
    default: 0,
  },
  followings: {
    type: Number,
    default: 0,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  pk: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stars: {
    type: Number,
    default: 0,
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('User', userSchema);
