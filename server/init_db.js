const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// Create a new SQLite database
const db = new sqlite3.Database('./db.sqlite');

// Function to create tables
const createTables = () => {
  db.serialize(() => {
    // Drop existing tables
    db.run(`DROP TABLE IF EXISTS users`);
    db.run(`DROP TABLE IF EXISTS memes`);
    db.run(`DROP TABLE IF EXISTS captions`);
    db.run(`DROP TABLE IF EXISTS meme_captions`);

    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);

    // Create memes table
    db.run(`CREATE TABLE IF NOT EXISTS memes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL
    )`);

    // Create captions table
    db.run(`CREATE TABLE IF NOT EXISTS captions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    )`);

    // Create meme_captions table (junction table for many-to-many relationship)
    db.run(`CREATE TABLE IF NOT EXISTS meme_captions (
      meme_id INTEGER,
      caption_id INTEGER,
      is_best_match INTEGER,
      FOREIGN KEY(meme_id) REFERENCES memes(id),
      FOREIGN KEY(caption_id) REFERENCES captions(id)
    )`);
  });
};

// Function to insert seed data
const insertSeedData = () => {
  db.serialize(() => {
    // Hash passwords
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword1 = bcrypt.hashSync('password1', salt);
    const hashedPassword2 = bcrypt.hashSync('password2', salt);

    // Insert users
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['user1', hashedPassword1]);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['user2', hashedPassword2]);

    // Insert memes
    const memeUrls = [
      'https://example.com/meme1.jpg',
      'https://example.com/meme2.jpg',
      'https://example.com/meme3.jpg',
      // Add more meme URLs
    ];

    memeUrls.forEach(url => {
      db.run(`INSERT INTO memes (url) VALUES (?)`, [url]);
    });

    // Insert captions
    const captions = [
      'When you realize it’s Monday again',
      'That feeling when you finish your project',
      'Me trying to understand the assignment',
      // Add more captions
    ];

    captions.forEach(text => {
      db.run(`INSERT INTO captions (text) VALUES (?)`, [text]);
    });

    // Insert meme-captions relationships
    const memeCaptions = [
      { memeId: 1, captionId: 1, isBestMatch: 1 },
      { memeId: 1, captionId: 2, isBestMatch: 0 },
      { memeId: 1, captionId: 3, isBestMatch: 0 },
      { memeId: 2, captionId: 2, isBestMatch: 1 },
      { memeId: 2, captionId: 3, isBestMatch: 1 },
      // Add more relationships
    ];

    memeCaptions.forEach(({ memeId, captionId, isBestMatch }) => {
      db.run(`INSERT INTO meme_captions (meme_id, caption_id, is_best_match) VALUES (?, ?, ?)`, [memeId, captionId, isBestMatch]);
    });
  });
};

// Create tables and insert seed data
createTables();
insertSeedData();

// Close the database connection
db.close();
