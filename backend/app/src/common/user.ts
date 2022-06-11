export class User {
    createdAt: Date;

    username: string;

    password: string;

    score: number;

    state: UserState;
}

export enum UserState {
    CAN_GUESS,
    GUESSINg,
}
