import db from '../config/db.mjs';

class Meme {
  static fetchAll(callback) {
    db.all('SELECT * FROM memes', [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  static fetchRandom(callback) {
    db.get('SELECT * FROM memes ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  static fetchById(id, callback) {
    db.get('SELECT * FROM memes WHERE id = ?', [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  static create(url, callback) {
    db.run('INSERT INTO memes (url) VALUES (?)', [url], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, url });
    });
  }

  static update(id, url, callback) {
    db.run('UPDATE memes SET url = ? WHERE id = ?', [url, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id, url });
    });
  }

  static delete(id, callback) {
    db.run('DELETE FROM memes WHERE id = ?', [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }
}

export default Meme;
