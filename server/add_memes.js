const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database connection
const db = new sqlite3.Database('./db.sqlite');

// Function to insert new memes
const insertMemes = () => {
  const memes = [
    { url: 'https://www.bu.edu/files/2023/12/Screenshot-2023-12-11-at-4.53.48-PM-1022x1024.png' },
    { url: 'https://www.bu.edu/files/2023/12/Screenshot-2023-12-12-at-2.02.43-PM-900x737.png' },
    { url: 'https://www.bu.edu/files/2023/12/Screenshot-2023-12-12-at-2.07.21-PM-1.png' },
    { url: 'https://www.bu.edu/files/2023/12/Screenshot-2023-12-12-at-2.14.38-PM-768x753.png' },
    { url: 'https://www.bu.edu/files/2023/12/Screenshot-2023-12-12-at-2.20.06-PM-1024x645.png' },
    { url: 'https://www.bu.edu/files/2023/12/unnamed.jpg' },
    { url: 'https://www.bu.edu/files/2023/12/unnamed-1-708x1024.jpg' },
  ];

  db.serialize(() => {
    memes.forEach(({ url }) => {
      db.run(`INSERT INTO memes (url) VALUES (?)`, [url], (err) => {
        if (err) {
          console.error(`Error inserting meme: ${url}`, err.message);
        } else {
          console.log(`Inserted meme: ${url}`);
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

// Insert new memes
insertMemes();
