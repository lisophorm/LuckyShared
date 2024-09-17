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
                <p>{game.provider}</p>
                <div className="game-icons">
                    {/* Add custom icons like a play button or favorite button */}
                    <i className="fas fa-play-circle"></i>
                    <i className="far fa-heart"></i>
                </div>
            </div>
        </Link>
    )
}

export default GameItem
