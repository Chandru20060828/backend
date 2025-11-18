// controllers/progressController.js
const db = require('../db');

async function upsertStars(req, res) {
  try {
    const { user_id, stars, completed_levels } = req.body;
    if (!user_id || typeof stars === 'undefined') return res.status(400).json({ message: 'user_id and stars required' });

    // Upsert logic: try insert, if duplicate update
    const sql = `
      INSERT INTO user_progress (user_id, stars, completed_levels)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE stars = VALUES(stars), completed_levels = VALUES(completed_levels), updated_at = CURRENT_TIMESTAMP
    `;
    await db.execute(sql, [user_id, stars, completed_levels || null]);
    return res.json({ message: 'Stars updated', user_id, stars });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'DB error', error: err.message });
  }
}

async function getProgress(req, res) {
  try {
    const userId = req.params.userId;
    const [rows] = await db.execute('SELECT * FROM user_progress WHERE user_id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ message: 'No progress found' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'DB error', error: err.message });
  }
}

module.exports = { upsertStars, getProgress };
