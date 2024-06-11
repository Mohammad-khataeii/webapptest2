import express from 'express';
import { fetchRandomMeme, addMeme } from '../controllers/memeController.mjs';

const router = express.Router();

router.get('/random', fetchRandomMeme);
router.post('/add', addMeme);

export default router;
