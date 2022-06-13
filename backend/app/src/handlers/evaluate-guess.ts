import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { LambdaApp } from "../apps/lambda-app";
import { EvaluateGuessApp } from "../apps/evaluate-guess-app";
import { GuessDynamoClientRepository } from "../common/guess/guess-dynamoclient-repository";

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const repository = new GuessDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new EvaluateGuessApp(repository);

    console.log("Running the EvaluateGuessApp");
    return await app.run(event);
};
