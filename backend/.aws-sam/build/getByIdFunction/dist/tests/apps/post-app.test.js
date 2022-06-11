"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const moq_ts_1 = require("moq.ts");
const post_app_1 = require("../../src/apps/post-app");
const apigateway_event_mock_1 = require("../mocks/apigateway-event-mock");
describe('PostApp instance', () => {
    const tableName = 'MY_TABLE';
    // Stubs out our TodoRepository interface so we can simulate the expected behavior
    // with a successful "put" to the underlying data store.
    const repoMock = new moq_ts_1.Mock()
        .setup(instance => instance.putTodo(moq_ts_1.It.IsAny(), tableName))
        .returns(new Promise((resolve) => { resolve(); }));
    describe('constructor', () => {
        it('table is assigned', () => {
            const app = new post_app_1.PostApp(tableName, repoMock.object());
            (0, chai_1.expect)(app.table).to.equal(tableName);
        });
        it('repository is assigned', () => {
            const app = new post_app_1.PostApp(tableName, repoMock.object());
            (0, chai_1.expect)(app.repository).to.equal(repoMock.object());
        });
    });
    describe('run', () => {
        it('invalid json body returns 400 status code', async () => {
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            event.body = '{""}';
            const app = new post_app_1.PostApp(tableName, repoMock.object());
            const response = await app.run(event);
            (0, chai_1.expect)(response).to.have.property('statusCode');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
        });
        it('invalid todo "title" returns 422 status code', async () => {
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            event.body = '{"id":"1", "isComplete":"false"}';
            const app = new post_app_1.PostApp(tableName, repoMock.object());
            const response = await app.run(event);
            (0, chai_1.expect)(response).to.have.property('statusCode');
            (0, chai_1.expect)(response.statusCode).to.equal(422);
        });
        it('invalid todo "id" returns 422 status code', async () => {
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            event.body = '{"title":"helloworld", "isComplete":"false"}';
            const app = new post_app_1.PostApp(tableName, repoMock.object());
            const response = await app.run(event);
            (0, chai_1.expect)(response).to.have.property('statusCode');
            (0, chai_1.expect)(response.statusCode).to.equal(422);
        });
        it('missing todo "isComplete" sets property to false', async () => {
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            event.body = '{"title":"helloworld", "id":"1"}';
            const app = new post_app_1.PostApp(tableName, repoMock.object());
            const response = await app.run(event);
            (0, chai_1.expect)(response).to.have.property('statusCode');
            (0, chai_1.expect)(response.statusCode).to.equal(201);
            (0, chai_1.expect)(response).to.have.property('body');
            if (!response.body) {
                chai_1.expect.fail('body was not returned in the response');
            }
            const todo = JSON.parse(response.body);
            (0, chai_1.expect)(todo.isComplete).to.equal(false);
        });
        it('repository is called to store a single record', async () => {
            const mock = new moq_ts_1.Mock()
                .setup(instance => instance.putTodo(moq_ts_1.It.IsAny(), tableName))
                .returns(new Promise((resolve) => { resolve(); }));
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            const app = new post_app_1.PostApp(tableName, mock.object());
            await app.run(event);
            mock.verify(instance => instance.putTodo(moq_ts_1.It.IsAny(), tableName), moq_ts_1.Times.Once());
        });
        it('repository issue returns 500 status code', async () => {
            // Stub our TodoRepository so it simulates a failed operation from the
            // underlying data store.
            const mock = new moq_ts_1.Mock()
                .setup(instance => instance.putTodo(moq_ts_1.It.IsAny(), tableName))
                .returns(new Promise((resolve, reject) => { reject(new Error('unit test rejected Promise')); }));
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            const app = new post_app_1.PostApp(tableName, mock.object());
            const response = await app.run(event);
            (0, chai_1.expect)(response).to.have.property('statusCode');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1hcHAudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL2FwcHMvcG9zdC1hcHAudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlCQUFlO0FBQ2YsK0JBQThCO0FBQzlCLG1DQUF5QztBQUV6QyxzREFBa0Q7QUFNbEQsMEVBQXFFO0FBRXJFLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDOUIsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDO0lBRTdCLGtGQUFrRjtJQUNsRix3REFBd0Q7SUFDeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFJLEVBQWtCO1NBQ3RDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBRSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzFELE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdELFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBRXpCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7WUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxrQkFBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUV0RCxJQUFBLGFBQU0sRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7WUFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxrQkFBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUV0RCxJQUFBLGFBQU0sRUFBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7UUFDakIsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUksMkNBQW1CLEVBQUUsQ0FBQztZQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUVwQixNQUFNLEdBQUcsR0FBRyxJQUFJLGtCQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sUUFBUSxHQUF1QixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUQsSUFBQSxhQUFNLEVBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEQsSUFBQSxhQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOENBQThDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBSSwyQ0FBbUIsRUFBRSxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxJQUFJLEdBQUcsa0NBQWtDLENBQUM7WUFFaEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxrQkFBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN0RCxNQUFNLFFBQVEsR0FBdUIsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFELElBQUEsYUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hELElBQUEsYUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUksMkNBQW1CLEVBQUUsQ0FBQztZQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLDhDQUE4QyxDQUFDO1lBRTVELE1BQU0sR0FBRyxHQUFHLElBQUksa0JBQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdEQsTUFBTSxRQUFRLEdBQXVCLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxRCxJQUFBLGFBQU0sRUFBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRCxJQUFBLGFBQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxLQUFLLElBQUksRUFBRTtZQUM5RCxNQUFNLEtBQUssR0FBRyxJQUFJLDJDQUFtQixFQUFFLENBQUM7WUFDeEMsS0FBSyxDQUFDLElBQUksR0FBRyxrQ0FBa0MsQ0FBQztZQUVoRCxNQUFNLEdBQUcsR0FBRyxJQUFJLGtCQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sUUFBUSxHQUF1QixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUQsSUFBQSxhQUFNLEVBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEQsSUFBQSxhQUFNLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBQSxhQUFNLEVBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLGFBQU0sQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUN4RDtZQUVELE1BQU0sSUFBSSxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBYSxDQUFDO1lBQzdELElBQUEsYUFBTSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSSxFQUFrQjtpQkFDbEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQzFELE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdELE1BQU0sS0FBSyxHQUFHLElBQUksMkNBQW1CLEVBQUUsQ0FBQztZQUV4QyxNQUFNLEdBQUcsR0FBRyxJQUFJLGtCQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsY0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDdEQsc0VBQXNFO1lBQ3RFLHlCQUF5QjtZQUN6QixNQUFNLElBQUksR0FBRyxJQUFJLGFBQUksRUFBa0I7aUJBQ2xDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBRSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUMxRCxPQUFPLENBQUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzRyxNQUFNLEtBQUssR0FBRyxJQUFJLDJDQUFtQixFQUFFLENBQUM7WUFFeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxrQkFBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNsRCxNQUFNLFFBQVEsR0FBdUIsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFELElBQUEsYUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hELElBQUEsYUFBTSxFQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9