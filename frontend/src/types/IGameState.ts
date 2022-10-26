export interface IMatchResult {
    isDraw?: boolean;
    winner?: {
      playerID: string;
      victoryData: any;
    };
  }

export interface IGameState {
  cells: string[];
  setupData: {
    matchName: string;
    playerOrder?: string[];
  };
  matchResult?: IMatchResult;
  gameOver: {
    playAgain: string[];
    newMatchID: string;
  };
}
