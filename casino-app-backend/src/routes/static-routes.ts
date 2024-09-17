import express, { Request, Response } from 'express'
import { renderHTML } from '../controllers/render-html'
import app from '../app'
import { searchGames } from '../controllers/game-controller'

const router = express.Router()

router.get('/', renderHTML)
router.get('/game/*', renderHTML)
router.get('/games/*', renderHTML)
router.get('/games', renderHTML)

export default router
