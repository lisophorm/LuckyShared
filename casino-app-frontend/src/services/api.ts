import axios from 'axios'
import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'
import { GamesResponse } from '../typescript/GamesResponse.type'

const api = axios.create({
    baseURL: `${settings.BASE_URL}api/games`,
})

// Fetches games with pagination and processes each game before returning
export const fetchGames = async (
    page: number = 1,
    limit: number = 10
): Promise<GamesResponse> => {
    try {
        const response = await api.get(`/`, { params: { page, limit } })
        const games = response.data as GamesResponse

        // Process each game one by one (e.g., logging, modifying fields)
        const processedGames = {
            items: games.items.map((game) => processGame(game)),
            total: games.total,
        }

        return processedGames
    } catch (error) {
        console.error('Error fetching games:', error)
        throw error
    }
}

// Search games by query and process each game before returning5
export const searchGames = async (q: string): Promise<GamesResponse> => {
    try {
        const response = await api.get(`/search`, { params: { q } })
        const games = response.data as GamesResponse

        // Process each game in the search results
        const processedGames = {
            items: games.items.map((game) => processGame(game)),
            total: games.total,
        }
        return processedGames
    } catch (error) {
        console.error('Error searching for games:', error)
        throw error
    }
}

// Get a game by ID and process the game before returning
export const getGameById = async (
    id: string | undefined
): Promise<CasinoGame> => {
    try {
        const response = await api.get(`/game/${id}`)
        const game = response.data as CasinoGame

        // Process the single game
        return processGame(game)
    } catch (error) {
        console.error('Error fetching game by ID:', error)
        throw error
    }
}

// Helper function to process each game (expand as needed)
const processGame = (game: CasinoGame): CasinoGame => {
    // Perform any other operations on each game (e.g., formatting, validation)

    return game
}
