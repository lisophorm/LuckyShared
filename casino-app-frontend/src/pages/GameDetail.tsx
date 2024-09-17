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
            <h1 className="title">{game?.name}</h1>
            <img src={game?.icon_2} alt={game?.name} className="image" />

            <div className="info">
                <p className="game-detail__provider">
                    <strong>Provider:</strong> {game?.provider}
                </p>
                <p className="ratio">
                    <strong>Ratio:</strong> {game?.ratio}
                </p>
                <p className="status">
                    <strong>Status:</strong> {game?.status}
                </p>
            </div>

            <div className="categories">
                <h2>Categories</h2>
                <p>{game?.cats.map((cat) => cat.title).join(', ')}</p>
            </div>

            <div className="themes">
                <h2>Themes</h2>
                <p>{game?.thms.map((theme) => theme.title).join(', ')}</p>
            </div>
        </div>
    )
}

export default GameDetail
