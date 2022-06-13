import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { LambdaApp } from "./lambda-app";
import { GuessRepository } from "../common/guess";

export class EvaluateGuessApp implements LambdaApp {
    repository: GuessRepository;

    constructor(repository: GuessRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        try {
            const { username } = JSON.parse(event.body);

            if (!username) {
                throw new Error("Body is missing the username");
            }

            await this.repository.evaluateGuess(username);
            return { statusCode: 200 };
        } catch (err) {
            return { statusCode: 500, body: err.message };
        }
    }
}
