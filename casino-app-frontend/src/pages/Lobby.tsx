import React from "react";
import GameList from "../components/GameList";

const Lobby: React.FC = () => {
  return (
    <div className="lobby">
      <h1>Casino Lobby</h1>
      {/* Display the game list */}
      <GameList />
    </div>
  );
};

export default Lobby;
