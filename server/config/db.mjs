import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Convert __dirname and __filename to be compatible with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the SQLite database file
const dbDirectory = resolve(__dirname, '../database');
const dbPath = resolve(dbDirectory, 'meme_game.db');

// Ensure the database directory exists
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Create or open the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables if they do not exist
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);

  // Memes table
  db.run(`
    CREATE TABLE IF NOT EXISTS memes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);

  // Captions table
  db.run(`
    CREATE TABLE IF NOT EXISTS captions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);

  // MemeCaptions table
  db.run(`
    CREATE TABLE IF NOT EXISTS meme_captions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      meme_id INTEGER NOT NULL,
      caption_id INTEGER NOT NULL,
      is_best_match BOOLEAN NOT NULL,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (meme_id) REFERENCES memes(id),
      FOREIGN KEY (caption_id) REFERENCES captions(id)
    )
  `);

  // Games table
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      date TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

export default db;
