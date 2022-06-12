"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayEventMock = void 0;
class ApiGatewayEventMock {
    constructor() {
        this.body = '{ "username": "Robin_Braumann", "score":0, "state":0}';
        this.resource = "/";
        this.path = "/";
        this.httpMethod = "post";
        this.headers = {
            "Content-Type": "application/json",
        };
        this.pathParameters = {};
        this.requestContext = {
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
}
exports.ApiGatewayEventMock = ApiGatewayEventMock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpZ2F0ZXdheS1ldmVudC1tb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL21vY2tzL2FwaWdhdGV3YXktZXZlbnQtbW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLG1CQUFtQjtJQUFoQztRQUNJLFNBQUksR0FBRyx1REFBdUQsQ0FBQztRQUMvRCxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2YsU0FBSSxHQUFHLEdBQUcsQ0FBQztRQUNYLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsWUFBTyxHQUFHO1lBQ04sY0FBYyxFQUFFLGtCQUFrQjtTQUNyQyxDQUFDO1FBQ0YsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsbUJBQWMsR0FBRztZQUNiLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLEtBQUssRUFBRSxNQUFNO1lBQ2IsU0FBUyxFQUFFLFNBQVM7WUFDcEIsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUM5QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzVCLElBQUksRUFBRSxHQUFHO1lBQ1QsWUFBWSxFQUFFLEdBQUc7WUFDakIsVUFBVSxFQUFFLE1BQU07WUFDbEIsS0FBSyxFQUFFLFNBQVM7U0FDbkIsQ0FBQztJQUNOLENBQUM7Q0FBQTtBQXJCRCxrREFxQkMifQ==