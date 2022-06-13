export class Guess {
    id: string;
    username: string;
    btcPrice: number;
    guess: GuessOptions;
    createdAt: string;

    constructor(id: string, username: string, btcPrice: string, guess: GuessOptions) {
        this.id = id;
        this.username = username;
        this.btcPrice = +btcPrice;
        this.guess = guess;
        this.createdAt = new Date().toISOString();
    }
}

export enum GuessOptions {
    UP,
    DOWN,
}
