const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// 🔐 تسجيل حساب جديد
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'اسم المستخدم وكلمة المرور مطلوبة' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ error: 'اسم المستخدم مستخدم بالفعل' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ success: true, message: 'تم إنشاء الحساب بنجاح', user });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'فشل إنشاء الحساب' });
  }
});

// 🔐 تسجيل الدخول
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'اسم المستخدم وكلمة المرور مطلوبة' });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'المستخدم غير موجود' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: 'كلمة المرور غير صحيحة' });

    // ✅ يمكنك تفعيل JWT لاحقًا إذا أردت
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '7d',
    });

    res.json({ success: true, token, user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'فشل تسجيل الدخول' });
  }
});

module.exports = router;
