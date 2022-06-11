"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayEventMock = void 0;
class ApiGatewayEventMock {
    constructor() {
        this.body = '{ "id": "1", "title":"test", "isComplete": "false"}';
        this.resource = '/';
        this.path = '/';
        this.httpMethod = 'post';
        this.headers = {
            'Content-Type': 'application/json'
        };
        this.pathParameters = {};
        this.requestContext = {
            accountId: '123456789',
            resourceId: '123456789',
            stage: 'prod',
            requestId: 'abcdefg',
            requestTime: Date().toString(),
            requestTimeEpoch: Date.now(),
            path: '/',
            resourcePath: '/',
            httpMethod: 'post',
            apiId: 'abcdefg'
        };
    }
}
exports.ApiGatewayEventMock = ApiGatewayEventMock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpZ2F0ZXdheS1ldmVudC1tb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvbW9ja3MvYXBpZ2F0ZXdheS1ldmVudC1tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsbUJBQW1CO0lBQWhDO1FBQ1EsU0FBSSxHQUFHLHFEQUFxRCxDQUFDO1FBQzdELGFBQVEsR0FBRyxHQUFHLENBQUM7UUFDZixTQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ1gsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixZQUFPLEdBQUc7WUFDTixjQUFjLEVBQUUsa0JBQWtCO1NBQ3JDLENBQUM7UUFDRixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixtQkFBYyxHQUFHO1lBQ2IsU0FBUyxFQUFFLFdBQVc7WUFDdEIsVUFBVSxFQUFFLFdBQVc7WUFDdkIsS0FBSyxFQUFFLE1BQU07WUFDYixTQUFTLEVBQUUsU0FBUztZQUNwQixXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzlCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDNUIsSUFBSSxFQUFFLEdBQUc7WUFDVCxZQUFZLEVBQUUsR0FBRztZQUNqQixVQUFVLEVBQUUsTUFBTTtZQUNsQixLQUFLLEVBQUUsU0FBUztTQUNuQixDQUFDO0lBQ1YsQ0FBQztDQUFBO0FBckJELGtEQXFCQyJ9