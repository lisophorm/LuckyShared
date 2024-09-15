const games = require('../data/data.json');

// List all games with optional pagination
const listGames = (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedGames = games.slice(startIndex, endIndex);
    res.json({
        page,
        limit,
        totalItems: games.length,
        games: paginatedGames
    });
};




exports listGames,getGameById, searchGames

