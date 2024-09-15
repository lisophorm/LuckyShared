const express = require('express');
const app = express();
const port = 3000;

// Import routes
const gameRoutes = require('./routes/games');

// Middleware for JSON body parsing
app.use(express.json());

// Use the game routes
app.use('/games', gameRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});