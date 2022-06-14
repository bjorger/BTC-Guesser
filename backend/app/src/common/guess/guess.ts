import { v4 as uuid4 } from "uuid";

export class Guess {
    id: string;
    username: string;
    btcPrice: number;
    guess: GuessOptions;
    createdAt: string;

    constructor(username: string, btcPrice: number, guess: GuessOptions) {
        this.id = uuid4();
        this.username = username;
        this.btcPrice = btcPrice;
        this.guess = guess;
        this.createdAt = new Date().toISOString();
    }
}

export enum GuessOptions {
    UP,
    DOWN,
}
