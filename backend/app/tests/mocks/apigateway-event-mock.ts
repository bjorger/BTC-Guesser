import { ApiGatewayEvent } from "../../src/common/apigateway/apigateway-event";

export class ApiGatewayEventMock implements ApiGatewayEvent {
    body = '{"username":"Robin_Braumann","password":"Hallo123","confirmPassword":"Hallo123"}';
    resource = "/";
    path = "/";
    httpMethod = "post";
    headers = {
        "Content-Type": "application/json",
        Authorization: "",
    };
    pathParameters = {};
    requestContext = {
        accountId: "123456789",
        resourceId: "123456789",
        stage: "prod",
        requestId: "abcdefg",
        requestTime: Date().toString(),
        requestTimeEpoch: Date.now(),
        path: "/",
        resourcePath: "/",
        httpMethod: "post",
        apiId: "abcdefg",
    };
}
