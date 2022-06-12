import { User } from "./user";
import { UserResponse } from "./userResponse";

export interface UserRepository {
    createUser(
        username: string,
        password: string,
    ): Promise<{
        user: UserResponse;
    }>;
    loginUser(username: string, password: string, table: string): Promise<string>;
    getUserById(id: string, table: string): Promise<User>;
    updateUserScoreById(id: string, table: string, score: number): Promise<User>;
    updateUserStateById(id: string, table: string): Promise<User>;
}
