import { DynamoDB, StepFunctions } from "aws-sdk";
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
    ERROR_STATEMACHINE_EXECUTION_FAILED as ERROR_STATE_MACHINE_EXECUTION_FAILED,
    ERROR_INVALID_GUESS_OPTIONS,
    ERROR_COULD_NOT_UPDATE_SCORE,
} from "../errors";
import { Bitcoin } from "../bitcoin";
import axios from "axios";
import { GuessRepository } from "./guessRepository";
import { GuessResponse } from "./guessResponse";

export class GuessDynamoClientRepository implements GuessRepository {
    docClient: DynamoDB.DocumentClient;
    stepFunctions: StepFunctions;
    userTable: string = process.env["USER_TABLE"] || "";
    guessTable: string = process.env["GUESS_TABLE"] || "";
    secret: string = process.env["JWT_SECRET"] || "";
    stateMachineArn: string = process.env["STATE_MACHINE_ARN"] || "";

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
        this.stepFunctions = new StepFunctions();
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

        if (guess !== GuessOptions.DOWN && guess !== GuessOptions.UP) {
            throw new Error(ERROR_INVALID_GUESS_OPTIONS);
        }

        const user = result.Item as User;

        if (user.state === UserState.GUESSING) {
            throw new Error(ERROR_USER_GUESSING);
        }

        const btcPrice = await this.getBTCPrice();

        const guessObject = new Guess(username, +btcPrice, guess);
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

        const stateMachineParams: StepFunctions.StartExecutionInput = {
            stateMachineArn: this.stateMachineArn,
            input: JSON.stringify({ username, guessId: guessObject.id }),
        };

        try {
            await this.stepFunctions.startExecution(stateMachineParams).promise();
        } catch (error) {
            console.log(error.message);
            throw new Error(ERROR_STATE_MACHINE_EXECUTION_FAILED);
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

    async evaluateGuess(username: string, guessId: string): Promise<number> {
        const btcPrice = +(await this.getBTCPrice());
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.guessTable,
            Key: {
                id: guessId,
            },
        };
        let guessResult = 0;

        try {
            const result = await this.docClient.get(params).promise();

            if (!result || !result.Item) {
                throw new Error(ERROR_NO_GUESSES_FROM_USER);
            }
            const guess = result.Item as Guess;

            guessResult = this.evaluate(btcPrice, guess);
        } catch (error) {
            console.error(error);
            throw new Error(ERROR_NO_GUESSES_FROM_USER);
        }

        try {
            const updateUserParams: DynamoDB.DocumentClient.UpdateItemInput = {
                TableName: this.userTable,
                Key: {
                    username,
                },
                UpdateExpression: "set score = score + :guess_result, #user_state = :new_state",
                ExpressionAttributeNames: {
                    "#user_state": "state",
                },
                ExpressionAttributeValues: {
                    ":guess_result": guessResult,
                    ":new_state": UserState.CAN_GUESS,
                },
            };

            await this.docClient.update(updateUserParams).promise();

            return guessResult;
        } catch (error) {
            console.error(error.message);
            throw new Error(ERROR_COULD_NOT_UPDATE_SCORE);
        }
    }

    evaluate(btcPrice: number, guess: Guess): number {
        let guessResult = 0;
        if ((btcPrice > guess.btcPrice && guess.guess === GuessOptions.UP) || (btcPrice < guess.btcPrice && guess.guess === GuessOptions.DOWN)) {
            guessResult = 1;
        } else {
            guessResult = -1;
        }

        return guessResult;
    }
}
