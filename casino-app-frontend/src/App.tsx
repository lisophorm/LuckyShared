import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Lobby from './pages/Lobby'
import GameDetail from './pages/GameDetail'
import SearchResults from './pages/SearchResults'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <BrowserRouter>
                    <Routes>
                        {/* Lobby Page: Lists all games */}
                        <Route path="/" element={<Lobby />} />
                        <Route path="/games" element={<Lobby />} />

                        {/* Game Detail Page: Displays a specific game by ID */}
                        <Route path="/games/:id" element={<GameDetail />} />

                        {/* Search Results Page: Displays games based on search query */}
                        <Route path="/search" element={<SearchResults />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
