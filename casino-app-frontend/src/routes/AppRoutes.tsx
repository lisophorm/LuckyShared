import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lobby from '../pages/Lobby'
import GameDetail from '../pages/GameDetail'
import React from 'react'

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Lobby Page: Lists all games */}
                <Route path="/" element={<Lobby />} />
                <Route path="/games" element={<Lobby />} />

                {/* Game Detail Page: Displays a specific game by ID */}
                <Route path="/game/:id" element={<GameDetail />} />

                {/* Search Results Page: Displays games based on search query */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
