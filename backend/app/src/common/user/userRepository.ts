import { LoginResponse, UserResponse } from "./userResponse";

export interface UserRepository {
    createUser(username: string, password: string): Promise<UserResponse>;
    loginUser(username: string, password: string): Promise<LoginResponse>;
    loginUserWithJWT(JWT: string): Promise<LoginResponse>;
    placeGuess(username: string, guess: number): Promise<void>;

    // Informs user of the result of his latest bet
    // Returns the updated User object
    informUser(username: string): Promise<UserResponse>;
}
