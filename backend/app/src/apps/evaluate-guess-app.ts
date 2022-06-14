import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { GuessRepository } from "../common/guess";
import { ApiGatewayInvokeEvent } from "../common/apigateway/apigateway-invoke-event";
import { InvokedLambdaApp } from "./invoked-lambda-app";

export class EvaluateGuessApp implements InvokedLambdaApp {
    repository: GuessRepository;

    constructor(repository: GuessRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayInvokeEvent): Promise<ApiGatewayResponse> {
        console.log("TEST");
        console.log(event);
        try {
            const { username, guessId } = event;

            if (!username) {
                throw new Error("Body is missing the username");
            }

            if (!guessId) {
                throw new Error("Body is missing the guessId");
            }

            await this.repository.evaluateGuess(username, guessId);
            return { statusCode: 200 };
        } catch (err) {
            console.error(err.message);
            return { statusCode: 500, body: err.message };
        }
    }
}
