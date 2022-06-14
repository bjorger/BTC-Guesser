import { GuessResponse } from "./guessResponse";

export interface GuessRepository {
    placeGuess(username: string, guess: number): Promise<GuessResponse>;
    evaluateGuess(username: string, guessId: string): Promise<void>;
}
