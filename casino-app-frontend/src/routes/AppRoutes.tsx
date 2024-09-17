import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lobby from '../pages/Lobby'
import GameDetail from '../pages/GameDetail'
import React from 'react'

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Lobby />} />
                <Route path="/games" element={<Lobby />} />
                <Route path="/games/page/:page" element={<Lobby />} />
                <Route path="/game/:id" element={<GameDetail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
