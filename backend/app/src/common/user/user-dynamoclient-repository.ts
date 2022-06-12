import { DynamoDB } from "aws-sdk";
import { User } from "./user";
import { UserRepository } from "./userRepository";
import * as bcrypt from "bcrypt";
import { LoginResponse, UserResponse } from "./userResponse";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { sign, SignOptions } from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

export class UserDynamoClientRepository implements UserRepository {
    docClient: DynamoDB.DocumentClient;
    userTable: string = process.env["USER_TABLE"] || "";

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
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
            throw new Error("User not found");
        }

        const user = unmarshall(result.Item) as User;
        const valid_password = await bcrypt.compare(password, user.password);

        if (!valid_password) {
            throw new Error("Passwords do not match");
        }

        const payload = { username: user.username, createdAt: user.createdAt };
        const privateKey = fs.readFileSync(path.join(__dirname, "./../../private.key"));

        const signInOptions: SignOptions = {
            // RS256 uses a public/private key pair. The API provides the private key
            // to generate the JWT. The client gets a public key to validate the
            // signature
            algorithm: "RS256",
            expiresIn: "1h",
        };

        return { JWT: sign(payload, privateKey, signInOptions) };
    }
    getUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUserScoreById(id: string, score: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUserStateById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
