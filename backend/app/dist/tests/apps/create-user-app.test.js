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
        it("repository is called to create a user", async () => {
            // Stub a createUser invocation resolving a Promise with a valid user
            // instance from the data store
            const mock = new moq_ts_1.Mock()
                .setup((instance) => instance.createUser("Robin_Braumann", "Hallo123"))
                .returns(new Promise((resolve) => {
                resolve({
                    username: "Robin_Braumann",
                    state: user_1.UserState.CAN_GUESS,
                    score: 0,
                });
            }));
            const event = new apigateway_event_mock_1.ApiGatewayEventMock();
            const app = new create_user_app_1.CreateUserApp(mock.object());
            const response = await app.run(event);
            if (!response.body) {
                chai_1.expect.fail("expected a response body to be present");
            }
            const res = JSON.parse(response.body);
            (0, chai_1.expect)(res.username).to.equal("Robin_Braumann");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXItYXBwLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvYXBwcy9jcmVhdGUtdXNlci1hcHAudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlCQUFlO0FBQ2YsK0JBQThCO0FBQzlCLG1DQUFxQztBQUVyQywwRUFBcUU7QUFDckUsNENBQTRFO0FBQzVFLGdFQUEyRDtBQUUzRCxRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLGtGQUFrRjtJQUNsRix3REFBd0Q7SUFDeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFJLEVBQWtCO1NBQ3RDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUN0RSxPQUFPLENBQ0osSUFBSSxPQUFPLENBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNsQyxPQUFPLENBQUM7WUFDSixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLEtBQUssRUFBRSxnQkFBUyxDQUFDLFNBQVM7WUFDMUIsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBRU4sUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7UUFDekIsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtZQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLCtCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFakQsSUFBQSxhQUFNLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNuRCxxRUFBcUU7WUFDckUsK0JBQStCO1lBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSSxFQUFrQjtpQkFDbEMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUN0RSxPQUFPLENBQ0osSUFBSSxPQUFPLENBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbEMsT0FBTyxDQUFDO29CQUNKLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLEtBQUssRUFBRSxnQkFBUyxDQUFDLFNBQVM7b0JBQzFCLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUNMLENBQUM7WUFFTixNQUFNLEtBQUssR0FBRyxJQUFJLDJDQUFtQixFQUFFLENBQUM7WUFFeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSwrQkFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sUUFBUSxHQUF1QixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLGFBQU0sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUN6RDtZQUVELE1BQU0sR0FBRyxHQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFBLGFBQU0sRUFBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9