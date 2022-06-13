import { DynamoDB } from "aws-sdk";
import { User } from "./user";
import { UserRepository } from "./userRepository";
import * as bcrypt from "bcrypt";
import { LoginResponse, UserResponse } from "./userResponse";
import { sign, verify } from "jsonwebtoken";
import { ERROR_INVALID_JWT, ERROR_PASSWORDS_DO_NOT_MATCH, ERROR_USER_NOT_FOUND } from "../errors";
import { Bitcoin } from "../bitcoin";

export class UserDynamoClientRepository implements UserRepository {
    docClient: DynamoDB.DocumentClient;
    userTable: string = process.env["USER_TABLE"] || "";
    guessTable: string = process.env["GUESS_TABLE"] || "";
    secret = process.env["JWT_SECRET"] || "";

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
    }

    informUser(username: string): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }

    async createUser(username: string, password: string): Promise<UserResponse> {
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User(username, hashed);

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.userTable,
            Item: user,
            ConditionExpression: "attribute_not_exists(username)",
        };

        try {
            await this.docClient.put(params).promise();

            const { username, state, score } = user;

            return {
                username,
                state,
                score,
            };
        } catch {
            throw new Error("Could not create User");
        }
    }

    async loginUser(username: string, password: string): Promise<LoginResponse> {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.userTable,
            Key: {
                username,
            },
        };

        const result = await this.docClient.get(params).promise();

        if (!result || !result.Item) {
            throw new Error(ERROR_USER_NOT_FOUND);
        }

        const user = result.Item as User;

        const valid_password = await bcrypt.compare(password, user.password);

        if (!valid_password) {
            throw new Error(ERROR_PASSWORDS_DO_NOT_MATCH);
        }

        const payload = { username: user.username };

        const JWT = sign(payload, this.secret);

        return { JWT };
    }

    async loginUserWithJWT(JWT: string): Promise<LoginResponse> {
        try {
            verify(JWT, this.secret);

            return { JWT };
        } catch {
            throw new Error(ERROR_INVALID_JWT);
        }
    }

    async placeGuess(username: string, guess: number): Promise<void> {
        const coingeckoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";

        const response = await fetch(coingeckoURL, {
            method: "GET",
            headers: { accept: "application/json" },
        });

        const json = await response.json();

        console.log(json);

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.guessTable,
            Item: {
                BTCPrice: 0,
                guess,
            },
        };
    }
}
