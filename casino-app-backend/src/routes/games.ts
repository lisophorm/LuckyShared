import { Router, Request, Response } from "express";

const router = Router();

import { listGames } from "../controllers/list-games.controller";

//import { listGames, getGameById, searchGames } from '../controllers/gameController.js';

// List all games with pagination
router.get("/", listGames);

// Get game by ID
router.get("/:id", getGameById);

// Search games
router.get("/search", searchGames);

export default router;
