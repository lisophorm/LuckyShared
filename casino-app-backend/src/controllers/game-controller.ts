import { Request, Response } from 'express'
//import * as gamesJson from "../../data/games.json"; // Assume you put your games.json file in /data
import { CasinoGame } from '../models/game'
import { paginate } from '../utils/pagination'

const games: any[] = require('../../data/games.json')
console.log('gino:')
console.log('games length', games.length)

export const getAllGames = (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const paginatedGames = paginate(games, page, limit)
    res.json(paginatedGames)
}

export const getGameById = (req: Request, res: Response) => {
    const gameId = req.params.id
    const game = games.find((g: CasinoGame) => g.id === gameId)
    if (!game) {
        return res.status(404).json({ message: 'Game not found' })
    }
    res.json(game)
}

export const searchGames = (req: Request, res: Response) => {
    const query = req.query.q as string
    const results = games.filter((g: CasinoGame) =>
        g.name.toLowerCase().includes(query.toLowerCase())
    )
    res.json(results)
}
