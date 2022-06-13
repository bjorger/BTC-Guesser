import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";

import { LambdaApp } from "./lambda-app";
import { UserRepository } from "../common/user/userRepository";

export class BitcoinGuesserApp implements LambdaApp {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        try {
            const { username, guess } = JSON.parse(event.body);

            if (!username) {
                return { statusCode: 422, body: "Body is missing the username" };
            }

            const result = await this.repository.placeGuess(username, guess);
            return { statusCode: 201, body: JSON.stringify(result) };
        } catch (err) {
            console.error(err.message);

            return { statusCode: 400 };
        }
    }
}
