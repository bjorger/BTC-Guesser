import { UserState } from "./user";

export interface UserResponse {
    username: string;
    score: number;
    state: UserState;
}
