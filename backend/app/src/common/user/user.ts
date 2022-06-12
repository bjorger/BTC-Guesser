export class User {
    createdAt: Date;
    username: string;
    password: string;
    score: number;
    state: UserState;

    constructor(username: string, password: string) {
        this.createdAt = new Date();
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
