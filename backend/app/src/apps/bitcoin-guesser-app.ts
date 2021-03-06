import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { LambdaApp } from "./lambda-app";
import { ERROR_AUTH_HEADER_MISSING, ERROR_INVALID_JWT, ERROR_JWT_MISSING } from "../common/errors";
import { GuessRepository } from "../common/guess";

export class BitcoinGuesserApp implements LambdaApp {
    repository: GuessRepository;

    constructor(repository: GuessRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        let jwt = "";

        if ("Authorization" in event.headers) {
            const JWT = event.headers.Authorization.split(" ")[1];
            if (JWT) {
                jwt = JWT;
            } else {
                return { statusCode: 401, body: ERROR_JWT_MISSING };
            }
        } else {
            return { statusCode: 401, body: ERROR_AUTH_HEADER_MISSING };
        }

        try {
            const { guess } = JSON.parse(event.body);
            const result = await this.repository.placeGuess(jwt, +guess);
            return { statusCode: 201, body: JSON.stringify(result) };
        } catch (err) {
            if (err.message === ERROR_INVALID_JWT) {
                return { statusCode: 401, body: ERROR_INVALID_JWT };
            }
            return { statusCode: 500, body: err.message };
        }
    }
}
