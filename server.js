const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB error:', err));

// Routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth'); // ✅ أضفنا هذا السطر

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes); // ✅ وهذا

// Health check
app.get("/", (req, res) => {
  res.send("✅ InstaBooster API is live!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
