export class User {
    createdAt: string;
    username: string;
    password: string;
    score: number;
    state: UserState;

    constructor(username: string, password: string) {
        this.createdAt = new Date().toISOString();
        this.state = UserState.CAN_GUESS;
        this.username = username;
        this.password = password;
        this.score = 0;
    }
}

export enum UserState {
    CAN_GUESS,
    GUESSING,
}
