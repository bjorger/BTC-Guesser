import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";

import { LambdaApp } from "./lambda-app";
import { UserRepository } from "../common/user/userRepository";
import { ERROR_BODY_MISSING_USERNAME } from "../common/errors";

export class GetUserApp implements LambdaApp {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        try {
            const { username } = JSON.parse(event.body);
            if (!username) {
                return { statusCode: 422, body: ERROR_BODY_MISSING_USERNAME };
            }
            const result = await this.repository.getUserByUsername(username);
            return { statusCode: 201, body: JSON.stringify(result) };
        } catch (err) {
            return { statusCode: 400 };
        }
    }
}
