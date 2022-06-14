import { ApiGatewayInvokeEvent } from "../../src/common/apigateway/apigateway-invoke-event";

export class ApiGatewayInvokeEventMock implements ApiGatewayInvokeEvent {
    username = "bjorgzen";
    guessId = "b827f29b-7bf8-478b-aa2f-15bd37f5a32e";
}
