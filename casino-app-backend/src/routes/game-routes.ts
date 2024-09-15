import express from 'express';
import { getAllGames, getGameById, searchGames } from '../controllers/game-controller';

const router = express.Router();

// Get all games with pagination
router.get('/', getAllGames);

// Get a single game by ID
router.get('/:id', getGameById);

// Search for games
router.get('/search', searchGames);

export default router;
