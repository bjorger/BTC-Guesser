import { DynamoDB } from "aws-sdk";
import { User } from "./user";
import { UserRepository } from "./userRepository";
import * as bcrypt from "bcrypt";
import { LoginResponse, UserResponse } from "./userResponse";
import { sign, SignOptions } from "jsonwebtoken";
import { ERROR_PASSWORDS_NOT_MATCH, ERROR_USER_NOT_FOUND } from "../errors";

export class UserDynamoClientRepository implements UserRepository {
    docClient: DynamoDB.DocumentClient;
    userTable: string = process.env["USER_TABLE"] || "";
    secret = process.env["JWT_SECRET"] || "";

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
    }

    loginUserWithJWT(jwt: string): Promise<LoginResponse> {
        throw new Error("Method not implemented.");
    }

    informUser(username: string): Promise<UserResponse> {
        throw new Error("Method not implemented.");
    }

    placeGuess(username: string, guess: number): Promise<UserResponse> {
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
            console.log(`Stored record ${user.username} in the ${this.userTable} Table.`);
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
            throw new Error(ERROR_PASSWORDS_NOT_MATCH);
        }

        const payload = { username: user.username };
        const options =  { expiresIn: "1h" };

        const JWT = sign(payload, this.secret, options);

        return { JWT };
    }
}
