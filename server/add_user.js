const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// Create a new SQLite database connection
const db = new sqlite3.Database('./db.sqlite');

// Function to insert new users
const insertUsers = () => {
  const users = [
    { username: 'newuser1', password: 'newpassword1' },
    { username: 'newuser2', password: 'newpassword2' },
  ];

  db.serialize(() => {
    users.forEach(({ username, password }) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
        if (err) {
          console.error(`Error inserting user: ${username}`, err.message);
        } else {
          console.log(`Inserted user: ${username}`);
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

// Insert new users
insertUsers();
