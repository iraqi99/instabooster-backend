const mongoose = require('mongoose');
const Feed = require('./models/Feed');
const Package = require('./models/Package');

mongoose.connect('mongodb://127.0.0.1:27017/instabooster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("✅ Connected to MongoDB");

  // حذف البيانات القديمة
  await Feed.deleteMany({});
  await Package.deleteMany({});

  // إدخال بيانات تجريبية حقيقية
  await Feed.insertMany([
    {
      username: 'komila77',
      followers: 1234,
      followings: 850,
      stars: 0,
      pk: 'komila77_pk',
      bio: "مرحبا بكم في حسابي",
      fullName: 'Komila Ahmed',
      isPrivate: false,
      isVerified: true,
      isFirstLogin: false
    },
    {
      username: 'tiktokstar88',
      followers: 3200,
      followings: 900,
      stars: 0,
      pk: 'tiktokstar88_pk',
      bio: "TikTok influencer 🎥",
      fullName: 'Star TikTok',
      isPrivate: false,
      isVerified: false,
      isFirstLogin: false
    }
  ]);

  await Package.insertMany([
    {
      packageStars: 10,
      packageId: 'starter',
      packageName: 'Starter Pack',
      packagePlatform: 'android',
      packagePricing: 0,
      packsBought: 0
    },
    {
      packageStars: 25,
      packageId: 'pro',
      packageName: 'Pro Pack',
      packagePlatform: 'android',
      packagePricing: 0,
      packsBought: 0
    }
  ]);

  console.log("✅ Data inserted successfully");
  mongoose.disconnect();
}).catch(err => {
  console.error("❌ Failed to connect or seed:", err);
});
