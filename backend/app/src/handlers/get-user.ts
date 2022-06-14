import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { GetUserApp } from "../apps/get-user-app";
import { UserDynamoClientRepository } from "../common/user";
import { LambdaApp } from "../apps/lambda-app";
import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { headers } from "../common/headers";

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const repository = new UserDynamoClientRepository();
    const app: LambdaApp = new GetUserApp(repository);

    console.log("Running the GetUserApp");
    const response = await app.run(event);

    return { ...response, headers };
};
