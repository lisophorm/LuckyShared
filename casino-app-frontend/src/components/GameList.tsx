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

const GameList: React.FC = () => {
    const dispatch = useDispatch()
    const { gamesList, searchResults, loading, error, searchString } =
        useSelector((state: RootState) => state.games)

    useEffect(() => {
        dispatch(loadGames({ page: 1, limit: 20 }) as any)
    }, [dispatch])

    console.log('searchString', searchString)

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
        dispatch(setSearchString(query || ''))
        if (query) {
            dispatch(searchGameByName(query) as any)
            console.log('query:', query)
        } else {
            dispatch(loadGames({ page: 1, limit: 20 }) as any)
        }
    }

    const gamesToShow = searchResults.length ? searchResults : gamesList

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

    console.log('gamesList:', gamesToShow)

    return (
        <div className="game-list">
            <input
                type="text"
                placeholder="Search games..."
                onChange={handleSearch}
                value={searchString}
            />
            {/* Category Dropdown */}
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
                    {filteredGames.map((game) => (
                        <GameItem key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default GameList
