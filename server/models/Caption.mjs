import db from '../config/db.mjs';

class Caption {
  static fetchAll(callback) {
    db.all('SELECT * FROM captions', [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  static fetchRandom(callback) {
    db.all('SELECT * FROM captions ORDER BY RANDOM() LIMIT 5', [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  static fetchById(id, callback) {
    db.get('SELECT * FROM captions WHERE id = ?', [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  static create(text, callback) {
    db.run('INSERT INTO captions (text) VALUES (?)', [text], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, text });
    });
  }

  static update(id, text, callback) {
    db.run('UPDATE captions SET text = ? WHERE id = ?', [text, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id, text });
    });
  }

  static delete(id, callback) {
    db.run('DELETE FROM captions WHERE id = ?', [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }
}

export default Caption;
