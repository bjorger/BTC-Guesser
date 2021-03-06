import { LoginResponse, UserResponse } from "./userResponse";

export interface UserRepository {
    createUser(username: string, password: string): Promise<void>;
    loginUser(username: string, password: string): Promise<LoginResponse>;
    loginUserWithJWT(JWT: string): Promise<UserResponse>;
    getUserByUsername(username: string): Promise<UserResponse>;
}
