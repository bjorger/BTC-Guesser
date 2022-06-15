export interface Bitcoin {
    market_data: { current_price: { usd: string } };
}

export enum GuessOptions {
    UP,
    DOWN,
}
