/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  situation: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export type Team = 'A' | 'B';

export interface GameState {
  scoreA: number;
  scoreB: number;
  currentQuestionIndex: number;
  currentTurn: Team;
  phase: 'setup' | 'playing' | 'feedback' | 'finished';
  lastAnswerResult?: {
    isCorrect: boolean;
    explanation: string;
    team: Team;
  };
}
