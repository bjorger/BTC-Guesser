"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const moq_ts_1 = require("moq.ts");
const get_by_id_app_1 = require("../../src/apps/get-by-id-app");
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
            const app = new get_by_id_app_1.GetByIdApp(tableName, repoMock.object());
            (0, chai_1.expect)(app.table).to.equal(tableName);
        });
        it('repository is assigned', () => {
            const app = new get_by_id_app_1.GetByIdApp(tableName, repoMock.object());
            (0, chai_1.expect)(app.repository).to.equal(repoMock.object());
        });
    });
    describe('run', () => {
        it('path parameter missing "id" returns 404 status code', async () => {
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            const app = new get_by_id_app_1.GetByIdApp(tableName, repoMock.object());
            const response = await app.run(event);
            (0, chai_1.expect)(response).to.have.property('statusCode');
            (0, chai_1.expect)(response.statusCode).to.equal(404);
        });
        it('repository is called to get a record by id', async () => {
            const todo = { id: '123', title: 'hello world', isComplete: true };
            // Stub a getById invocation resolving a Promise with a valid TodoItem
            // instance from the data store
            const mock = new moq_ts_1.Mock()
                .setup(instance => instance.getTodoById(moq_ts_1.It.IsAny(), tableName))
                .returns(new Promise((resolve) => {
                resolve(todo);
            }));
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            event.pathParameters = { id: todo.id };
            const app = new get_by_id_app_1.GetByIdApp(tableName, mock.object());
            const response = await app.run(event);
            mock.verify(instance => instance.getTodoById(moq_ts_1.It.IsAny(), tableName), moq_ts_1.Times.Once());
            if (!response.body) {
                chai_1.expect.fail('expected a response body to be present');
            }
            const responseTodo = JSON.parse(response.body);
            (0, chai_1.expect)(responseTodo.id).to.equal(todo.id);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWJ5LWlkLWFwcC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvYXBwcy9nZXQtYnktaWQtYXBwLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQkFBZTtBQUNmLCtCQUE4QjtBQUM5QixtQ0FBeUM7QUFFekMsZ0VBQTBEO0FBSzFELDBFQUFxRTtBQUVyRSxRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQztJQUU3QixrRkFBa0Y7SUFDbEYsd0RBQXdEO0lBQ3hELE1BQU0sUUFBUSxHQUFHLElBQUksYUFBSSxFQUFrQjtTQUN0QyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMxRCxPQUFPLENBQUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3RCxRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUV6QixFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLElBQUksMEJBQVUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFekQsSUFBQSxhQUFNLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksMEJBQVUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFekQs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