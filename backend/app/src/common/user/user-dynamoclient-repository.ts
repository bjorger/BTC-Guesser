import { DynamoDB } from "aws-sdk";
import { User, UserState } from "./user";
import { UserRepository } from "./userRepository";
import * as bcrypt from "bcrypt";
import { UserResponse } from "./userResponse";

export class UserDynamoClientRepository implements UserRepository {
    docClient: DynamoDB.DocumentClient;

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
    }

    async createUser(
        username: string,
        password: string,
    ): Promise<{
        user: UserResponse;
    }> {
        const table = process.env["TABLE"] || "";
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User(username, hashed);

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: table,
            Item: user,
            ConditionExpression: "attribute_not_exists(username)",
        };

        try {
            await this.docClient.put(params).promise();
            console.log(`Stored record ${user.username} in the ${table} Table.`);
            const { username, state, score } = user;

            return {
                user: {
                    username,
                    state,
                    score,
                },
            };
        } catch {
            throw new Error("Could not create User");
        }
    }

    loginUser(username: string, password: string, table: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string, table: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUserScoreById(id: string, table: string, score: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUserStateById(id: string, table: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
