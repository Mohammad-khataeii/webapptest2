import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import authRoutes from './routes/authRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import memeRoutes from './routes/memeRoutes.mjs';
import captionRoutes from './routes/captionRoutes.mjs';
import gameRoutes from './routes/gameRoutes.mjs';
import { ensureAuthenticated } from './middlewares/authMiddleware.mjs';
import configurePassport from './config/passport.mjs';

// Convert __dirname and __filename to be compatible with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport.mjs')(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/memes', memeRoutes);
app.use('/api/captions', captionRoutes);
app.use('/api/game', gameRoutes);

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
