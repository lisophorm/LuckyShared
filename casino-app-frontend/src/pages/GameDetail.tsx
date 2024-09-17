import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameById } from '../services/api'
import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'
import { useNavigate } from 'react-router'

const GameDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [game, setGame] = useState<CasinoGame | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate() // Hook to navigate back

    const goBack = () => {
        navigate(-1) // Navigate back
    }

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await getGameById(id)
                setGame(response)
                setLoading(false)
            } catch (err) {
                setError('Error fetching game data')
                setLoading(false)
            }
        }
        fetchGame()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="game-detail">
            <button className="button button-secondary" onClick={goBack}>
                Back
            </button>
            <h1>{game?.name}</h1>
            <img src={game?.icon_2} alt={game?.name} />
            <p>Provider: {game?.provider}</p>
            <p>Status: {game?.status}</p>
            {/* Add more game details as needed */}
        </div>
    )
}

export default GameDetail
