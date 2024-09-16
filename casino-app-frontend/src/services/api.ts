import axios from 'axios'
import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'

console.log('window:', settings)

const api = axios.create({
    baseURL: `${settings.BASE_URL}api/games`,
})

// Fetches games with pagination and processes each game before returning
export const fetchGames = async (
    page: number = 1,
    limit: number = 10
): Promise<CasinoGame[]> => {
    try {
        const response = await api.get(`/`, { params: { page, limit } })
        console.log('fetch response', response)
        const games = response.data as CasinoGame[]

        // Process each game one by one (e.g., logging, modifying fields)
        const processedGames = games.map((game) => processGame(game))

        return processedGames
    } catch (error) {
        console.error('Error fetching games:', error)
        throw error
    }
}

// Search games by query and process each game before returning
export const searchGames = async (q: string): Promise<CasinoGame[]> => {
    try {
        const response = await api.get(`/search`, { params: { q } })
        console.log('search response', response)
        const games = response.data as CasinoGame[]

        // Process each game in the search results
        const processedGames = games.map((game) => processGame(game))

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
    // Example processing: Add a processed timestamp or manipulate data
    console.log(`Processing game: ${game.name}`)

    // Here, you can perform any other operations on each game (e.g., formatting, validation)

    return game // Return the processed game object
}
