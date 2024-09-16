import express from 'express'
import {
    getAllGames,
    getGameById,
    searchGames,
} from '../controllers/game-controller'

const router = express.Router()

// Get a single game by ID
router.get('/game/:id', getGameById)

// Search for games
router.get('/search', searchGames)

// Get all games with pagination
router.get('/', getAllGames)

export default router
