import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from '../features/gamesSlice'

// Create the Redux store
export const store = configureStore({
    reducer: {
        games: gamesReducer,
    },
})

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>

// Define the AppDispatch type (if needed in the future)
export type AppDispatch = typeof store.dispatch
