const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 👤 تسجيل الدخول
router.post('/user/login', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username });
    await user.save();
  }

  res.json({ success: true, user });
});

// 👤 جلب بيانات المستخدم
router.post('/user/profile', async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ success: true, user });
});

// 📄 جلب المنشورات (مؤقت)
router.post('/user/feeds', async (req, res) => {
  // بيانات وهمية مؤقتة (fake feeds)
  const feeds = [
    { id: '1', username: 'user1', followers: 1234 },
    { id: '2', username: 'user2', followers: 5678 },
  ];
  res.json({ success: true, feeds });
});

// ✅ تنفيذ عملية Follow
router.post('/user/follow', async (req, res) => {
  const { userId, feedId } = req.body;
  if (!userId || !feedId) return res.status(400).json({ error: 'Missing parameters' });

  // معالجة وهمية مؤقتة
  res.json({ success: true, message: `User ${userId} followed feed ${feedId}` });
});

// 📦 حزم وهمية
router.post('/user/packages', async (req, res) => {
  res.json({
    data: [
      { id: '1', packageStars: 10 },
      { id: '2', packageStars: 25 },
    ],
  });
});

// 🎁 Boost وهمي
router.post('/user/boost', async (req, res) => {
  res.json({ success: true, message: "Boosted!" });
});

// 🔁 استعلام عن boost
router.post('/user/getBoost', async (req, res) => {
  res.json({ boosts: 5 });
});

module.exports = router;
