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

const GameList: React.FC = () => {
    const dispatch = useDispatch()
    const { gamesList, searchResults, loading, error, searchString } =
        useSelector((state: RootState) => state.games)

    console.log('searchString', searchString)

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        dispatch(
            loadGames({
                page: currentPage,
                limit: settings.RECORDS_PAGE,
            }) as any
        )
    }, [dispatch, currentPage])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
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

    // Extract unique categories from the games to display
    const uniqueCategories = getUniqueCategories(gamesToShow)

    // Handle category change
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
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
            <Paginator
                currentPage={currentPage}
                totalPages={filteredGames.length} // Adjust based on your actual data
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default GameList
