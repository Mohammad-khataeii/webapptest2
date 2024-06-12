import db from '../config/db.mjs';
import bcrypt from 'bcryptjs';

class User {
  static fetchAll(callback) {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  static fetchById(id, callback) {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  static fetchByUsername(username, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  static create(username, password, email, callback) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, username, email });
    });
  }

  static update(id, username, password, email, callback) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.run('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [username, hashedPassword, email, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id, username, email });
    });
  }

  static delete(id, callback) {
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }

  static authenticate(username, password, callback) {
    this.fetchByUsername(username, (err, user) => {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false, { message: 'Incorrect username.' });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return callback(null, false, { message: 'Incorrect password.' });
      }

      return callback(null, user);
    });
  }
}

export default User;
