import db from '../config/db.mjs';

// Fetch user profile
export const fetchUserProfile = (req, res) => {
  const userId = req.user.id;

  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};
