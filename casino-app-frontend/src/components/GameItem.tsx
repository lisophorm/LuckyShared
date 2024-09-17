import React from 'react'
import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'
import { Link } from 'react-router-dom'

interface GameItemProps {
    game: CasinoGame
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
    return (
        <Link to={`/game/${game.id}`} className="game-item-link">
            <div className="game-item">
                <img src={game.icon_2} alt={game.name} className="image" />
                <h3 className="title">{game.name}</h3>
                <p className="provider">{game.provider}</p>
                <div className="icons">
                    <i className="fas fa-play-circle"></i>
                    <i className="far fa-heart"></i>
                </div>
            </div>
        </Link>
    )
}

export default GameItem
