import { useState } from "react";
import Board from "../../components/Board";

const PlayPage = () => {
  const [cells, setCells] = useState<string[]>(Array(8).fill(""));
  const [player, setPlayer] = useState<string>("0");


  return (
    <Board
      player={player}
      setPlayer={setPlayer}
      setCells={setCells}
      cells={cells}
      valueMapping={{ "0": "X", "1": "O" }}
    />
  );
};

export default PlayPage;
