import express from 'express';
import { submitResult, fetchGameHistory } from '../controllers/gameController.mjs';
import { ensureAuthenticated } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/submit', ensureAuthenticated, submitResult);
router.get('/history', ensureAuthenticated, fetchGameHistory);

export default router;
