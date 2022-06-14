import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";

import { LambdaApp } from "./lambda-app";
import { UserRepository } from "../common/user/userRepository";
import {
    ERROR_BODY_MISSING_PASSWORD,
    ERROR_BODY_MISSING_USERNAME,
    ERROR_CONFIRM_PASSWORD_MISSING,
    ERROR_PASSWORDS_DO_NOT_MATCH,
} from "../common/errors";

export class CreateUserApp implements LambdaApp {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        let _username: string;
        let _password: string;

        try {
            const { username, password, confirmPassword } = JSON.parse(event.body);
            if (!username) {
                return { statusCode: 422, body: ERROR_BODY_MISSING_USERNAME };
            } else if (!password) {
                return { statusCode: 422, body: ERROR_BODY_MISSING_PASSWORD };
            } else if (!confirmPassword) {
                return { statusCode: 422, body: ERROR_CONFIRM_PASSWORD_MISSING };
            } else if (confirmPassword !== password) {
                return { statusCode: 422, body: ERROR_PASSWORDS_DO_NOT_MATCH };
            }
            _username = username;
            _password = password;
        } catch (err) {
            console.log("Event body could not be parsed as JSON");
            return { statusCode: 400 };
        }

        try {
            await this.repository.createUser(_username, _password);
            return { statusCode: 201 };
        } catch (err) {
            return { statusCode: 500, body: err.message };
        }
    }
}
