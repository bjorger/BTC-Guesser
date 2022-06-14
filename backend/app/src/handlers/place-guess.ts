import { ApiGatewayEvent } from "../common/apigateway/apigateway-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";
import { LambdaApp } from "../apps/lambda-app";
import { BitcoinGuesserApp } from "../apps/bitcoin-guesser-app";
import { GuessDynamoClientRepository } from "../common/guess/guess-dynamoclient-repository";
import { headers } from "../common/headers";

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const repository = new GuessDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new BitcoinGuesserApp(repository);

    console.log("Running the BitcoinGuesserApp");
    const response = await app.run(event);

    return { ...response, headers };
};
