import { CasinoGame } from '@crystal-bits/casino-games/dist/casino-game.type'
import { GameCategory } from '@crystal-bits/casino-games/dist/game-category.interface' // Function to extract unique categories from gamesToShow

// Function to extract unique categories from gamesToShow
export const getUniqueCategories = (
    gamesToShow: CasinoGame[]
): GameCategory[] => {
    const categoryMap: { [key: string]: GameCategory } = {}

    gamesToShow.forEach((game) => {
        game.cats.forEach((cat) => {
            if (!categoryMap[cat.id]) {
                categoryMap[cat.id] = cat
            }
        })
    })

    return Object.values(categoryMap)
}
