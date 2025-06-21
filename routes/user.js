const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Default endpoint just to verify route is working
router.get('/', (req, res) => {
  res.send('📡 Instagram API is working!');
});

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
