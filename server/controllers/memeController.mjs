import db from '../config/db.mjs';

// Fetch a random meme
export const fetchRandomMeme = (req, res) => {
  db.get('SELECT * FROM memes ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'No memes found' });
    }
    res.json(row);
  });
};

// Add a new meme
export const addMeme = (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  db.run('INSERT INTO memes (url) VALUES (?)', [url], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Meme added successfully', id: this.lastID });
  });
};
