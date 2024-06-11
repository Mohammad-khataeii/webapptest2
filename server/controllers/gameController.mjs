import db from '../config/db.mjs';

// Submit game result
export const submitResult = (req, res) => {
  const { memeId, captionId } = req.body;
  const userId = req.user.id;

  // Check if the selected caption is the best match for the meme
  db.get(
    'SELECT is_best_match FROM meme_captions WHERE meme_id = ? AND caption_id = ?',
    [memeId, captionId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(400).json({ message: 'Invalid meme or caption selection' });
      }

      const isBestMatch = row.is_best_match;

      // Update the user's score if the caption is the best match
      if (isBestMatch) {
        db.run(
          'INSERT INTO games (user_id, score, date) VALUES (?, ?, ?)',
          [userId, 1, new Date()],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, isBestMatch: true });
          }
        );
      } else {
        db.run(
          'INSERT INTO games (user_id, score, date) VALUES (?, ?, ?)',
          [userId, 0, new Date()],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, isBestMatch: false });
          }
        );
      }
    }
  );
};

// Fetch game history
export const fetchGameHistory = (req, res) => {
  const userId = req.user.id;

  db.all('SELECT * FROM games WHERE user_id = ? ORDER BY date DESC', [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
