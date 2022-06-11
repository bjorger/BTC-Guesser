import { User } from "./user";

export interface UserRepository {
    createUser(
        username: string,
        password: string,
    ): Promise<{
        user: User;
    }>;
    loginUser(username: string, password: string, table: string): Promise<string>;
    getUserById(id: string, table: string): Promise<User>;
    updateUserScoreById(id: string, table: string, score: number): Promise<User>;
    updateUserStateById(id: string, table: string): Promise<User>;
}
