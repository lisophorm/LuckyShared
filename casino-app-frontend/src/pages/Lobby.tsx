import React from 'react'
import GameList from '../components/GameList'

const Lobby: React.FC = () => {
    return (
        <div className="lobby">
            <h1 className="lobby-title">Casino Lobby</h1>
            <GameList />
        </div>
    )
}

export default Lobby
