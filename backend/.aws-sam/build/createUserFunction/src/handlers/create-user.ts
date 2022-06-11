import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { GetByIdApp } from "../apps/get-by-id-app";
import { TodoDynamoClientRepository } from "../common/todo-dynamoclient-repository";
import { LambdaApp } from "../apps/lambda-app";
import { UserDynamoClientRepository } from "../common/user-dynamoclient-repository";
import { CreateUserApp } from "../apps/create-user-app";

/**
 * Sample Lambda function which creates an instance of a GetByIdApp and executes it.
 * The GetByIdApp evaluates the request path parameters and queries DynamoDB for the Id given.
 *
 * @param {Object} event - Input event to the Lambda function
 *
 * @returns {Object} object - Object containing the TodoItem stored.
 *
 */
export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const repository = new UserDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new CreateUserApp(repository);

    console.log("Running the CreateUserApp");
    return await app.run(event);
};
