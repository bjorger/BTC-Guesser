import { DynamoDB } from "aws-sdk";
import { User } from "./user";
import { UserRepository } from "./userRepository";
import * as bcrypt from "bcrypt";
import { LoginResponse, UserResponse } from "./userResponse";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import {
    ERROR_INVALID_JWT,
    ERROR_PASSWORDS_DO_NOT_MATCH,
    ERROR_PASSWORD_TOO_SHORT,
    ERROR_USERNAME_ALREADY_TAKEN,
    ERROR_USERNAME_TOO_SHORT,
    ERROR_USER_NOT_FOUND,
} from "../errors";

export class UserDynamoClientRepository implements UserRepository {
    docClient: DynamoDB.DocumentClient;
    userTable: string = process.env["USER_TABLE"] || "";
    secret = process.env["JWT_SECRET"] || "";

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
    }

    async createUser(username: string, password: string): Promise<void> {
        if (username.length < 6) {
            throw new Error(ERROR_USERNAME_TOO_SHORT);
        }

        if (password.length < 6) {
            throw new Error(ERROR_PASSWORD_TOO_SHORT);
        }

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
        } catch (error) {
            throw new Error(ERROR_USERNAME_ALREADY_TAKEN);
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

        return {
            JWT,
            user: {
                username: user.username,
                state: user.state,
                score: user.score,
            },
        };
    }

    async loginUserWithJWT(JWT: string): Promise<UserResponse> {
        try {
            const { username } = verify(JWT, this.secret) as JwtPayload;

            const user = await this.getUserByUsername(username);

            return user;
        } catch {
            throw new Error(ERROR_INVALID_JWT);
        }
    }

    async getUserByUsername(username: string): Promise<UserResponse> {
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

        return {
            username: user.username,
            score: user.score,
            state: user.state,
        };
    }
}
