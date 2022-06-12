import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { LambdaApp } from "../apps/lambda-app";
import { UserDynamoClientRepository } from "../common/user/user-dynamoclient-repository";
import { LoginUserApp } from "../apps/login-user-app";

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const repository = new UserDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new LoginUserApp(repository);

    console.log("Running the LoginUserApp");
    return await app.run(event);
};
