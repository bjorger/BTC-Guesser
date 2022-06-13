import { LoginResponse, UserResponse } from "./userResponse";

export interface UserRepository {
    createUser(username: string, password: string): Promise<UserResponse>;
    loginUser(username: string, password: string): Promise<LoginResponse>;
    loginUserWithJWT(JWT: string): Promise<LoginResponse>;
}
