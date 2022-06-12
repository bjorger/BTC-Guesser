import { User } from "./user";
import { UserResponse } from "./userResponse";

export interface UserRepository {
    createUser(username: string, password: string): Promise<UserResponse>;
    loginUser(username: string, password: string): Promise<string>;
    getUserById(id: string): Promise<User>;
    updateUserScoreById(id: string, score: number): Promise<User>;
    updateUserStateById(id: string): Promise<User>;
}
