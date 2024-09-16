import React from 'react'
import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'
import { Link } from 'react-router-dom'

interface GameItemProps {
    game: CasinoGame
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
    return (
        <Link to={`game/${game.id}`}>
            <div className="game-item">
                <img src={game.icon_2} alt={game.name} />
                <h3>{game.name}</h3>
            </div>
        </Link>
    )
}

export default GameItem
