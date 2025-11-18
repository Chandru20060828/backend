// routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const { upsertStars, getProgress } = require('../controllers/progressController');

router.post('/update-stars', upsertStars);
router.get('/progress/:userId', getProgress);

module.exports = router;
