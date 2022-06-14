import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { EvaluateGuessApp } from "../apps/evaluate-guess-app";
import { GuessDynamoClientRepository } from "../common/guess/guess-dynamoclient-repository";
import { ApiGatewayInvokeEvent } from "../common/apigateway/apigateway-invoke-event";
import { InvokedLambdaApp } from "../apps/invoked-lambda-app";
import { headers } from "../common/headers";

export const handler = async (event: ApiGatewayInvokeEvent): Promise<ApiGatewayResponse> => {
    const repository = new GuessDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: InvokedLambdaApp = new EvaluateGuessApp(repository);

    console.log("Running the EvaluateGuessApp");
    const response = await app.run(event);

    return { ...response, headers };
};
