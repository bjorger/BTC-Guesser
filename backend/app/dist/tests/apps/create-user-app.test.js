"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const moq_ts_1 = require("moq.ts");
const apigateway_event_mock_1 = require("../mocks/apigateway-event-mock");
const user_1 = require("../../common/user");
const create_user_app_1 = require("../../apps/create-user-app");
describe("PostApp instance", () => {
    // Stubs out our UserRepository interface so we can simulate the expected behavior
    // with a successful "put" to the underlying data store.
    const repoMock = new moq_ts_1.Mock()
        .setup((instance) => instance.createUser("Robin_Braumann", "Hallo123"))
        .returns(new Promise((resolve) => {
        resolve({
            username: "Robin_Braumann",
            state: user_1.UserState.CAN_GUESS,
            score: 0,
        });
    }));
    describe("constructor", () => {
        it("repository is assigned", () => {
            const app = new create_user_app_1.CreateUserApp(repoMock.object());
            (0, chai_1.expect)(app.repository).to.equal(repoMock.object());
        });
    });
    describe("run", () => {
        it('path parameter missing "password" returns 404 status code', async () => {
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            event.body = '{"username": "Robin_Braumann"}';
            const app = new create_user_app_1.CreateUserApp(repoMock.object());
            const response = await app.run(event);
            (0, chai_1.expect)(response).to.have.property("statusCode");
            (0, chai_1.expect)(response.statusCode).to.equal(422);
        });
        it("repository is called to create a user", async () => {
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            const app = new create_user_app_1.CreateUserApp(repoMock.object());
            const response = await app.run(event);
            repoMock.verify((instance) => instance.createUser("Robin_Braumann", "Hallo123"), moq_ts_1.Times.Once());
            if (!response.body) {
                chai_1.expect.fail("expected a response body to be present");
            }
            const res = JSON.parse(response.body);
            (0, chai_1.expect)(res.username).to.equal("Robin_Braumann");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXItYXBwLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvYXBwcy9jcmVhdGUtdXNlci1hcHAudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlCQUFlO0FBQ2YsK0JBQThCO0FBQzlCLG1DQUFxQztBQUVyQywwRUFBcUU7QUFDckUsNENBQTRFO0FBQzVFLGdFQUEyRDtBQUUzRCxRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLGtGQUFrRjtJQUNsRix3REFBd0Q7SUFDeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFJLEVBQWtCO1NBQ3RDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUN0RSxPQUFPLENBQ0osSUFBSSxPQUFPLENBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNsQyxPQUFPLENBQUM7WUFDSixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLEtBQUssRUFBRSxnQkFBUyxDQUFDLFNBQVM7WUFDMUIsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBRU4sUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7UUFDekIsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtZQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLCtCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFakQsSUFBQSxhQUFNLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLEVBQUUsQ0FBQywyREFBMkQsRUFBRSxLQUFLLElBQUksRUFBRTtZQUN2RSxNQUFNLEtBQUssR0FBRyxJQUFJLDJDQUFtQixFQUFFLENBQUM7WUFDeEMsS0FBSyxDQUFDLElBQUksR0FBRyxnQ0FBZ0MsQ0FBQztZQUU5QyxNQUFNLEdBQUcsR0FBRyxJQUFJLCtCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDakQsTUFBTSxRQUFRLEdBQXVCLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxRCxJQUFBLGFBQU0sRUFBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRCxJQUFBLGFBQU0sRUFBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNuRCxNQUFNLEtBQUssR0FBRyxJQUFJLDJDQUFtQixFQUFFLENBQUM7WUFFeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSwrQkFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sUUFBUSxHQUF1QixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsRUFBRSxjQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDaEIsYUFBTSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2FBQ3pEO1lBRUQsTUFBTSxHQUFHLEdBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBaUIsQ0FBQztZQUNwRSxJQUFBLGFBQU0sRUFBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9