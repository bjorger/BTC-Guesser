import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { GuessRepository } from "../common/guess";
import { ApiGatewayInvokeEvent } from "../common/apigateway/apigateway-invoke-event";
import { InvokedLambdaApp } from "./invoked-lambda-app";
import { ERROR_BODY_MISSING_GUESS_ID, ERROR_BODY_MISSING_USERNAME } from "../common/errors";

export class EvaluateGuessApp implements InvokedLambdaApp {
    repository: GuessRepository;

    constructor(repository: GuessRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayInvokeEvent): Promise<ApiGatewayResponse> {
        try {
            const { username, guessId } = event;

            if (!username) {
                throw new Error(ERROR_BODY_MISSING_USERNAME);
            }

            if (!guessId) {
                throw new Error(ERROR_BODY_MISSING_GUESS_ID);
            }

            await this.repository.evaluateGuess(username, guessId);
            return { statusCode: 200 };
        } catch (err) {
            console.error(err.message);
            return { statusCode: 500, body: err.message };
        }
    }
}
