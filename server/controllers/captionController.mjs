import Caption from '../models/Caption.mjs';

// Fetch random captions
export const fetchRandomCaptions = (req, res) => {
  Caption.fetchRandom((err, captions) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(captions);
  });
};

// Add a new caption
export const addCaption = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  Caption.create(text, (err, caption) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Caption added successfully', caption });
  });
};
