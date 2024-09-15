import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadGames, searchGameByName } from "../features/gamesSlice";
import GameItem from "./GameItem";
import { RootState } from "../app/store";

const GameList: React.FC = () => {
  const dispatch = useDispatch();
  const { gamesList, searchResults, loading, error } = useSelector(
    (state: RootState) => state.games,
  );

  useEffect(() => {
    dispatch(loadGames({ page: 1, limit: 20 }) as any);
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query) {
      dispatch(searchGameByName(query) as any);
    } else {
      dispatch(loadGames({ page: 1, limit: 20 }) as any);
    }
  };

  const gamesToShow = searchResults.length ? searchResults : gamesList;

  console.log("gamesList:", gamesList);

  return (
    <div className="game-list">
      <input
        type="text"
        placeholder="Search games..."
        onChange={handleSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="games-grid">
          {/*{gamesToShow.map((game) => (*/}
          {/*  <GameItem key={game.id} game={game} />*/}
          {/*))}*/}
        </div>
      )}
    </div>
  );
};

export default GameList;
