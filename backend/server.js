require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const Link = require('./models/Link');
const linksRouter = require('./routes/links');

const app = express();

// -------------------- CORS FIX --------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://tinylinkshortener.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());
// ---------------------------------------------------

app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI missing in env');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });

// Health check
app.get('/healthz', (req, res) => {
  return res.json({ ok: true, version: '1.0', uptime: process.uptime() });
});

// API routes
app.use('/api/links', linksRouter);

// Redirect route (MUST BE LAST)
app.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).send('Not found');

    link.clicks = (link.clicks || 0) + 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.url);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
