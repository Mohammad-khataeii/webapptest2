import express from 'express';
import { fetchUserProfile } from '../controllers/userController.mjs';
import { ensureAuthenticated } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/profile', ensureAuthenticated, fetchUserProfile);

export default router;
