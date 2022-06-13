import { UserState } from "../user";
import { Guess } from "./guess";

export interface GuessResponse {
    guess: Guess;
    userState: UserState;
}
