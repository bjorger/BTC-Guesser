import { ApiGatewayInvokeEvent } from "../common/apigateway/apigateway-invoke-event";
import { ApiGatewayResponse } from "../common/apigateway/apigateway-response";

export interface InvokedLambdaApp {
    run(event: ApiGatewayInvokeEvent): Promise<ApiGatewayResponse>;
}
