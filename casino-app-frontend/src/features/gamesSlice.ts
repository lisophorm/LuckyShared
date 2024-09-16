import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchGames, searchGames } from '../services/api'
import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'
import { AppDispatch, store } from '../app/store'

interface GamesState {
    gamesList: CasinoGame[]
    searchResults: CasinoGame[]
    loading: boolean
    error: string | null
    searchString: string // Add searchString to the state
}

const initialState: GamesState = {
    gamesList: [],
    searchResults: [],
    loading: false,
    error: null,
    searchString: '', // Initial empty search string
}

export const loadGames = createAsyncThunk(
    'games/loadGames',
    async ({ page, limit }: { page: number; limit: number }) => {
        const response = await fetchGames(page, limit)
        console.log('response:', response)
        return response
    }
)

export const searchGameByName = createAsyncThunk(
    'games/searchGameByName',
    async (query: string) => {
        const response = await searchGames(query)
        console.log('response searchgames:', response)

        //  store.dispatch(setSearchString(query))
        return response
    }
)

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        // Action to set search string
        setSearchString: (state, action) => {
            state.searchString = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGames.pending, (state) => {
                state.loading = true
            })
            .addCase(loadGames.fulfilled, (state, action) => {
                state.loading = false
                console.log('fullfilled', action.payload)
                state.gamesList = action.payload.map((game: any) => {
                    return game
                })
            })
            .addCase(loadGames.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to load games'
            })
            .addCase(searchGameByName.pending, (state) => {
                state.loading = true
            })
            .addCase(searchGameByName.fulfilled, (state, action) => {
                state.loading = false
                console.log('action:', action)
                state.searchResults = action.payload
            })
            .addCase(searchGameByName.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to search games'
            })
    },
})
export const { setSearchString } = gamesSlice.actions // Export the action
export default gamesSlice.reducer
