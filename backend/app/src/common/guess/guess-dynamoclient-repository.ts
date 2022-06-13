import { DynamoDB, Lambda } from "aws-sdk";
import { User, UserState } from "../user";
import { Guess, GuessOptions } from "./guess";
import { JwtPayload, verify } from "jsonwebtoken";
import {
    ERROR_INVALID_JWT,
    ERROR_NO_BITCOIN_DATA_AVAILABLE,
    ERROR_USER_NOT_FOUND,
    ERROR_COULD_NOT_CREATE_GUESS,
    ERROR_USER_GUESSING,
    ERROR_NO_GUESSES_FROM_USER,
    ERROR_INVOCATION_FAILED,
} from "../errors";
import { Bitcoin } from "../bitcoin";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
import { GuessRepository } from "./guessRepository";
import { GuessResponse } from "./guessResponse";

export class GuessDynamoClientRepository implements GuessRepository {
    docClient: DynamoDB.DocumentClient;
    lambda: Lambda;
    userTable: string = process.env["USER_TABLE"] || "";
    guessTable: string = process.env["GUESS_TABLE"] || "";
    secret = process.env["JWT_SECRET"] || "";

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
        this.lambda = new Lambda();
    }

    async placeGuess(JWT: string, guess: number): Promise<GuessResponse> {
        let username = "";

        try {
            const result = verify(JWT, this.secret) as JwtPayload;

            username = result.username;
        } catch {
            throw new Error(ERROR_INVALID_JWT);
        }

        const userParams: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.userTable,
            Key: {
                username,
            },
        };

        const result = await this.docClient.get(userParams).promise();

        if (!result || !result.Item) {
            throw new Error(ERROR_USER_NOT_FOUND);
        }

        const user = result.Item as User;

        if (user.state === UserState.GUESSING) {
            throw new Error(ERROR_USER_GUESSING);
        }

        const btcPrice = await this.getBTCPrice();

        const guessObject = new Guess(uuid4(), username, btcPrice, guess);
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.guessTable,
            Item: guessObject,
        };

        const updateUserParams: DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: this.userTable,
            Key: {
                username,
            },
            UpdateExpression: "set #user_state = :new_state",
            ExpressionAttributeNames: {
                "#user_state": "state",
            },
            ExpressionAttributeValues: {
                ":new_state": UserState.GUESSING,
            },
        };

        try {
            await this.docClient.put(params).promise();
        } catch {
            throw new Error(ERROR_COULD_NOT_CREATE_GUESS);
        }

        try {
            await this.docClient.update(updateUserParams).promise();
        } catch (error) {
            console.error(error.message);
            throw new Error(ERROR_USER_NOT_FOUND);
        }

        const invocationParams: Lambda.InvocationRequest = {
            FunctionName: "evaluateGuessFunction", // the lambda function we are going to invoke
            InvocationType: "RequestResponse",
            LogType: "Tail",
            Payload: `{ "username" : ${username} }`,
        };

        try {
            await this.lambda.invoke(invocationParams).promise();
        } catch {
            throw new Error(ERROR_INVOCATION_FAILED);
        }

        return { guess: guessObject, userState: UserState.GUESSING };
    }

    async getBTCPrice(): Promise<string> {
        const coingeckoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";
        const response = await axios({
            method: "GET",
            url: coingeckoURL,
        });

        if (!response) {
            throw new Error(ERROR_NO_BITCOIN_DATA_AVAILABLE);
        }

        const bitcoin = response.data as Bitcoin;
        const btcPrice = bitcoin.market_data.current_price.eur;

        return btcPrice;
    }

    async evaluateGuess(username: string): Promise<void> {
        const btcPrice = +(await this.getBTCPrice());
        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: this.guessTable,
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username,
            },
            ScanIndexForward: false,
            Limit: 1,
        };

        const result = await this.docClient.query(params).promise();

        if (!result || !result.Items) {
            throw new Error(ERROR_NO_GUESSES_FROM_USER);
        }

        const guess = result.Items[0] as Guess;

        if ((btcPrice > guess.btcPrice && guess.guess === GuessOptions.UP) || (btcPrice < guess.btcPrice && guess.guess === GuessOptions.DOWN)) {
            console.log(1);
        }
        console.log(-1);
    }
}
