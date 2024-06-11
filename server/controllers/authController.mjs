const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register a new user
exports.register = (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login a user
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);

      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your secret key
      res.cookie('jwt', token, { httpOnly: true, secure: false }); // Use secure: true in production

      res.json({ success: true, message: 'Logged in successfully' });
    });
  })(req, res, next);
};

// Logout a user
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.clearCookie('jwt');
    res.json({ success: true, message: 'Logged out successfully' });
  });
};
