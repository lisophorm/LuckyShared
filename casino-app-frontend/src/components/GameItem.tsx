import React from 'react'
import { CasinoGame } from '../types/game'

interface GameItemProps {
    game: CasinoGame
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
    return (
        <div className="game-item">
            <img src={game.icon_2} alt={game.name} />
            <h3>{game.name}</h3>
        </div>
    )
}

export default GameItem
