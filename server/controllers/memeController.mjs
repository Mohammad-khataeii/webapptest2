import Meme from '../models/Meme.mjs';

// Fetch a random meme
export const fetchRandomMeme = (req, res) => {
  Meme.fetchRandom((err, meme) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!meme) {
      return res.status(404).json({ message: 'No memes found' });
    }
    res.json(meme);
  });
};

// Add a new meme
export const addMeme = (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  Meme.create(url, (err, meme) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Meme added successfully', meme });
  });
};
