import express from 'express';
import { fetchRandomCaptions, addCaption } from '../controllers/captionController.mjs';

const router = express.Router();

router.get('/random', fetchRandomCaptions);
router.post('/add', addCaption);

export default router;
