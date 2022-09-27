export interface IGameState {
  cells: string[];
  setupData: {
    matchName: string;
  };
  matchResult?: {
    isDraw?: boolean;
    winner?: {
      playerID: string;
      victoryData: any;
    };
  };
  gameOver: {
    playAgain: string[];
    newMatchID: string;
  };
}
