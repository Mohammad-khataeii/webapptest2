import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';

export default function configurePassport(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.fetchByUsername(username, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.fetchById(id, (err, user) => {
      if (err) return done(err);
      done(null, user);
    });
  });
}
