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

// 📄 جلب المنشورات (feeds)
router.post('/user/feeds', async (req, res) => {
  const feeds = [
    {
      id: '1',
      username: 'user1',
      followers: 1234,
      followings: 800,
      stars: 0,
      pk: '1',
      bio: "I'm a test user",
      fullName: 'Test User One',
      isPrivate: false,
      isVerified: false,
      isFirstLogin: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      username: 'user2',
      followers: 5678,
      followings: 1200,
      stars: 0,
      pk: '2',
      bio: "Another test user",
      fullName: 'Test User Two',
      isPrivate: false,
      isVerified: false,
      isFirstLogin: false,
      createdAt: new Date().toISOString(),
    }
  ];
  res.json({ success: true, data: feeds });
});

// ✅ تنفيذ عملية Follow
router.post('/user/follow', async (req, res) => {
  const { userId, feedId } = req.body;
  if (!userId || !feedId) return res.status(400).json({ error: 'Missing parameters' });

  res.json({
    success: true,
    data: {
      id: "dummyFollowId",
      userId,
      feedId,
      reward: 1,
      createdAt: new Date().toISOString(),
      __v: 0
    }
  });
});

// 📦 حزم وهمية
router.post('/user/packages', async (req, res) => {
  res.json({
    data: [
      {
        id: '1',
        packageStars: 10,
        packageId: 'pkg1',
        packageName: 'Mini Pack',
        packagePlatform: 'android',
        packagePricing: 0,
        packsBought: 0,
        createdAt: new Date().toISOString(),
        __v: 0
      },
      {
        id: '2',
        packageStars: 25,
        packageId: 'pkg2',
        packageName: 'Mega Pack',
        packagePlatform: 'android',
        packagePricing: 0,
        packsBought: 0,
        createdAt: new Date().toISOString(),
        __v: 0
      }
    ]
  });
});

// 🎁 Boost وهمي
router.post('/user/boost', async (req, res) => {
  res.json({ success: true, message: "Boosted!" });
});

// 🔁 استعلام عن boost
router.post('/user/getBoost', async (req, res) => {
  res.json({
    data: [
      {
        id: '1',
        boostStar: 3,
        boostOfFollower: 30,
        boostUsed: 0,
        createdAt: new Date().toISOString(),
        __v: 0
      }
    ]
  });
});

module.exports = router;
