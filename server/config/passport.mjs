const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, false, { message: 'Incorrect username' });

        const isValid = bcrypt.compareSync(password, row.password);
        if (!isValid) return done(null, false, { message: 'Incorrect password' });

        return done(null, row);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) return done(err);
      done(null, row);
    });
  });
};
