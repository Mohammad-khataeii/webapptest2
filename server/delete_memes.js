const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database connection
const db = new sqlite3.Database('./db.sqlite');

// Function to delete all rows from memes table
const deleteAllMemes = () => {
  db.serialize(() => {
    db.run(`DELETE FROM memes`, (err) => {
      if (err) {
        console.error('Error deleting all rows from memes table:', err.message);
      } else {
        console.log('Deleted all rows from memes table.');
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

// Delete all rows from memes table
deleteAllMemes();
