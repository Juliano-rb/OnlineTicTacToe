export interface IMatchResult {
  isDraw?: boolean;
  winner?: {
    playerID: string;
    // rome-ignore lint/suspicious/noExplicitAny: TODO: Add typing to this
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
