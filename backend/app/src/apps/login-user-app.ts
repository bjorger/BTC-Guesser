import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";

import { LambdaApp } from "./lambda-app";
import { UserRepository } from "../common/user/userRepository";

export class LoginUserApp implements LambdaApp {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        let _username: string;
        let _password: string;
        
        try {
            const { username, password } = JSON.parse(event.body);
            if (!username) {
                console.log("Body is missing the username");
                return { statusCode: 422, body: "Body is missing the username" };
            } else if (!password) {
                console.log("Body is missing the password");
                return { statusCode: 422, body: "Body is missing the password" };
            }
            _username = username;
            _password = password;
        } catch (err) {
            console.log("Event body could not be parsed as JSON");
            return { statusCode: 400 };
        }

        try {
            const result = await this.repository.loginUser(_username, _password);
            return { statusCode: 201, body: JSON.stringify(result) };
        } catch (err) {
            console.log(err.message);
            return { statusCode: 500, body: "Could not login user" };
        }
    }
}
