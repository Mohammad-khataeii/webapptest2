import db from '../config/db.mjs';

class Game {
  static create(userId, score, callback) {
    const date = new Date();
    db.run('INSERT INTO games (user_id, score, date) VALUES (?, ?, ?)', [userId, score, date], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, userId, score, date });
    });
  }

  static fetchByUserId(userId, callback) {
    db.all('SELECT * FROM games WHERE user_id = ? ORDER BY date DESC', [userId], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }
}

export default Game;
