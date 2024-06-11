const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database connection
const db = new sqlite3.Database('./db.sqlite');

// Function to insert new captions
const insertCaptions = () => {
  const captions = [
    'When you realize it’s Monday again',
    'That feeling when you finish your project',
    'Me trying to understand the assignment',
    'When your code finally works',
    'When you accidentally delete your main branch',
    'Debugging: Being the detective in a crime movie where you are also the murderer',
    'When you solve a bug that you’ve been working on for hours',
    'When you push code to production without testing',
    'When your teammate merges a PR without reviewing it',
    'That moment when you realize you forgot to save your work',
    'When you attend a meeting that could have been an email',
    'When you find a solution on Stack Overflow',
    'When your boss assigns you a task on Friday afternoon',
    'When the code review is more brutal than expected',
    'When you have to explain your code to someone else',
  ];

  db.serialize(() => {
    captions.forEach(text => {
      db.run(`INSERT INTO captions (text) VALUES (?)`, [text], (err) => {
        if (err) {
          console.error(`Error inserting caption: ${text}`, err.message);
        } else {
          console.log(`Inserted caption: ${text}`);
        }
      });
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

// Insert new captions
insertCaptions();
