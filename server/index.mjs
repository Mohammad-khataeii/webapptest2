import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';

const app = express();
const db = new sqlite3.Database('./db.sqlite');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Define Passport Local Strategy
passport.use(new LocalStrategy(
  function (username, password, done) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    done(err, user);
  });
});

// Define API routes here

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

