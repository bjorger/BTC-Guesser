import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { EvaluateGuessApp } from "../apps/evaluate-guess-app";
import { GuessDynamoClientRepository } from "../common/guess/guess-dynamoclient-repository";
import { ApiGatewayInvokeEvent } from "../common/apigateway/apigateway-invoke-event";
import { InvokedLambdaApp } from "../apps/invoked-lambda-app";

export const handler = async (event: ApiGatewayInvokeEvent): Promise<ApiGatewayResponse> => {
    const repository = new GuessDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: InvokedLambdaApp = new EvaluateGuessApp(repository);

    console.log("Running the EvaluateGuessApp");
    return await app.run(event);
};
