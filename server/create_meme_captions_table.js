const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database connection
const db = new sqlite3.Database('./db.sqlite');

// Function to create the meme_captions table
const createMemeCaptionsTable = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS meme_captions (
      meme_id INTEGER,
      caption_id INTEGER,
      is_best_match INTEGER,
      FOREIGN KEY(meme_id) REFERENCES memes(id),
      FOREIGN KEY(caption_id) REFERENCES captions(id)
    )`, (err) => {
      if (err) {
        console.error('Error creating meme_captions table:', err.message);
      } else {
        console.log('Created meme_captions table.');
      }
    });
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
};

// Create the meme_captions table
createMemeCaptionsTable();
