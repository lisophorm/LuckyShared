import React from 'react'
import { GameCategory } from '@crystal-bits/casino-games/dist/game-category.interface'

interface CategoryDropdownProps {
    categories: GameCategory[]
    selectedCategory: string | null
    onCategoryChange: (categoryId: string) => void
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
}) => {
    return (
        <select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value)}
        >
            <option value="">All Categories</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.title}
                </option>
            ))}
        </select>
    )
}

export default CategoryDropdown
