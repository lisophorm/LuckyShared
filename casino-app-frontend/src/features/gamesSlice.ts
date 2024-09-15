import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames, searchGames } from "../services/api";
import { CasinoGame } from "../types/game";

interface GamesState {
  gamesList: CasinoGame[];
  searchResults: CasinoGame[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  gamesList: [],
  searchResults: [],
  loading: false,
  error: null,
};

export const loadGames = createAsyncThunk(
  "games/loadGames",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetchGames(page, limit);
    console.log("response:", response);
    return response.data;
  },
);

export const searchGameByName = createAsyncThunk(
  "games/searchGameByName",
  async (query: string) => {
    const response = await searchGames(query);
    return response.data;
  },
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadGames.fulfilled, (state, action) => {
        state.loading = false;
        console.log("fullfilled", action.payload);
        state.gamesList = action.payload.map((game: any) => {
          return game;
        });
      })
      .addCase(loadGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load games";
      })
      .addCase(searchGameByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchGameByName.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
      })
      .addCase(searchGameByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search games";
      });
  },
});

export default gamesSlice.reducer;
