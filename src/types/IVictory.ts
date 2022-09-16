export type VictoryPositions = 'top' | 'left' | 'right' | 'bottom' | 'middle';
export type VictoryRotations = '45deg' | '90deg' | '-45deg' | '0';

export interface IVictoryLine {
  position: VictoryPositions;
  rotation: VictoryRotations;
  winner: string;
}
