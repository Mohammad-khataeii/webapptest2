import User from '../models/User.mjs';

// Fetch user profile
export const fetchUserProfile = (req, res) => {
  const userId = req.user.id;

  User.fetchById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(user);
  });
};
