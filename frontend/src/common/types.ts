export interface Bitcoin {
    market_data: { current_price: { eur: string } };
}

export enum GuessOptions {
    UP,
    DOWN,
}
