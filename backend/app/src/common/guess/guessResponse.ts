import { UserResponse } from "../user";
import { Guess } from "./guess";

export interface GuessResponse {
    guess: Guess;
    user: UserResponse;
}
