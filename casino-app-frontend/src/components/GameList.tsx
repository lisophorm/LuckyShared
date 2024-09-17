import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    loadGames,
    searchGameByName,
    setSearchString,
} from '../features/gamesSlice'
import { RootState } from '../app/store'
import GameItem from './GameItem'
import { getUniqueCategories } from '../utils/getUniqueCategories'
import CategoryDropdown from './CategoryDropdown'
import Paginator from './Paginator'
import { useParams } from 'react-router-dom'
import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'

const GameList: React.FC = () => {
    const dispatch = useDispatch()
    const { gamesList, searchResults, loading, error, searchString, total } =
        useSelector((state: RootState) => state.games)

    const [searchTerm, setSearchTerm] = useState('')

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )
    const { page } = useParams<{ page: string }>() // Capture the "page" parameter from the URL
    const currentPage = page ? parseInt(page, 10) : 1 // If no page param, default to page 1

    useEffect(() => {
        dispatch(
            loadGames({
                page: currentPage,
                limit: settings.RECORDS_PAGE,
            }) as any
        )
    }, [dispatch, currentPage])

    const handleClearSearch = () => {
        setSearchTerm('')
        dispatch(setSearchString(''))
        // please forgive me for this heresy. But you know there are time
        setTimeout(() => {
            window.location.reload()
        }, 50)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
        setSearchTerm(query)
        dispatch(setSearchString(query || ''))
        if (query) {
            dispatch(searchGameByName(query) as any)
            console.log('query:', query)
        } else {
            dispatch(
                loadGames({
                    page: currentPage,
                    limit: settings.RECORDS_PAGE,
                }) as any
            )
        }
    }

    const gamesToShow = searchResults.length ? searchResults : gamesList

    // Updated logic to grey out non-matching games
    const isGreyedOut = (game: CasinoGame) => {
        if (!selectedCategory || selectedCategory === 'all') {
            return false // If no category is selected or 'all' is selected, nothing is greyed out
        }
        return !game.cats.some((cat) => cat.id === selectedCategory)
    }

    // Extract unique categories from the games to display
    const uniqueCategories = getUniqueCategories(gamesToShow)

    // Handle category change
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId)
    }

    // Filter games based on the selected category
    const filteredGames = selectedCategory
        ? gamesToShow.filter((game) =>
              game.cats.some((cat) => cat.id === selectedCategory)
          )
        : gamesToShow

    console.log('gamesList:', filteredGames)

    return (
        <div className="game-list">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                {searchTerm && (
                    <i
                        className="fas fa-times clear-icon"
                        onClick={handleClearSearch}
                    ></i>
                )}
            </div>
            <CategoryDropdown
                categories={uniqueCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="games-grid">
                    {gamesToShow.map((game) => (
                        <div
                            key={game.id}
                            className={`game-item-wrapper ${isGreyedOut(game) ? 'greyed-out' : ''}`}
                        >
                            <GameItem game={game} />
                        </div>
                    ))}
                </div>
            )}
            <Paginator
                currentPage={currentPage}
                basePath="/games"
                totalPages={
                    searchString && searchString !== ''
                        ? filteredGames.length / settings.RECORDS_PAGE
                        : total / settings.RECORDS_PAGE
                } // Adjust based on your actual data
                // onPageChange={handlePageChange}
            />
        </div>
    )
}

export default GameList
