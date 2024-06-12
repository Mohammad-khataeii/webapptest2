import Game from '../models/Game.mjs';

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
      const score = isBestMatch ? 1 : 0;

      // Create a new game record
      Game.create(userId, score, (err, game) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, isBestMatch, game });
      });
    }
  );
};

// Fetch game history
export const fetchGameHistory = (req, res) => {
  const userId = req.user.id;

  Game.fetchByUserId(userId, (err, games) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(games);
  });
};
