import { ApiGatewayEvent } from "common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "common/apigateway/apigateway-response";
import { LambdaApp } from "apps/lambda-app";
import { UserDynamoClientRepository } from "common/user/user-dynamoclient-repository";
import { CreateUserApp } from "apps/create-user-app";

/**
 * Lambda function which creates an instance of a CreateUserApp and executes it.
 *
 * @param {Object} event - Input event to the Lambda function
 *
 * @returns {Object} object - Object containing the User stored.
 *
 */
export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const repository = new UserDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new CreateUserApp(repository);

    console.log("Running the CreateUserApp");
    return await app.run(event);
};
