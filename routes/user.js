const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Feed = require('../models/Feed');
const Follow = require('../models/Follow');
const Package = require('../models/Package');
const Boost = require('../models/Boost');

// 👤 تسجيل الدخول
router.post('/user/login', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// 👤 جلب بيانات المستخدم
router.post('/user/profile', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// 📄 جلب المنشورات (feeds)
router.post('/user/feeds', async (req, res) => {
  try {
    const feeds = await Feed.find().sort({ createdAt: -1 }).limit(30);
    res.json({ success: true, data: feeds });
  } catch (err) {
    console.error("Feeds Error:", err);
    res.status(500).json({ success: false, error: 'Failed to fetch feeds' });
  }
});

// ✅ تنفيذ عملية Follow
router.post('/user/follow', async (req, res) => {
  try {
    const { userId, feedId } = req.body;
    if (!userId || !feedId) return res.status(400).json({ error: 'Missing parameters' });

    const follow = new Follow({
      userId,
      feedId,
      reward: 1,
    });

    await follow.save();
    res.json({ success: true, data: follow });
  } catch (err) {
    console.error("Follow Error:", err);
    res.status(500).json({ success: false, error: 'Failed to follow' });
  }
});

// 📦 جلب الحزم
router.post('/user/packages', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json({ success: true, data: packages });
  } catch (err) {
    console.error("Packages Error:", err);
    res.status(500).json({ success: false, error: 'Failed to fetch packages' });
  }
});

// 🎁 تنفيذ Boost
router.post('/user/boost', async (req, res) => {
  try {
    const { userId, boostStar, boostOfFollower } = req.body;
    if (!userId || boostStar == null || boostOfFollower == null) {
      return res.status(400).json({ error: 'Missing boost parameters' });
    }

    const boost = new Boost({
      userId,
      boostStar,
      boostOfFollower,
      boostUsed: 0,
    });

    await boost.save();
    res.json({ success: true, data: boost });
  } catch (err) {
    console.error("Boost Error:", err);
    res.status(500).json({ success: false, error: 'Failed to boost' });
  }
});

// 🔁 استعلام عن boost
router.post('/user/getBoost', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const boosts = await Boost.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: boosts });
  } catch (err) {
    console.error("GetBoost Error:", err);
    res.status(500).json({ success: false, error: 'Failed to get boosts' });
  }
});

module.exports = router;
