export class Guess {
    id: string;
    username: string;
    btcPrice: string;
    guess: string;
    createdAt: string;

    constructor(id: string, username: string, btcPrice: string, guess: string) {
        this.id = id;
        this.username = username;
        this.btcPrice = btcPrice;
        this.guess = guess;
        this.createdAt = new Date().toISOString();
    }
}
