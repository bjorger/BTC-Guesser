import { expect } from "chai";
import "mocha";
import { Mock } from "moq.ts";
import { GetUserApp } from "../../src/apps/get-user-app";
import { ApiGatewayResponse } from "../../src/common/apigateway/apigateway-response";
import { UserRepository, UserResponse, UserState } from "../../src/common/user";
import { ApiGatewayEventMock } from "../mocks/apigateway-event-mock";

describe("GetUser instance", () => {
    const userResponse: UserResponse = {
        username: "Robin_Braumann",
        score: 1,
        state: UserState.CAN_GUESS,
    };

    const repoMock = new Mock<UserRepository>()
        .setup((instance) => instance.getUserByUsername("Robin_Braumann"))
        .returns(
            new Promise<UserResponse>((resolve) => {
                resolve(userResponse);
            }),
        );

    describe("constructor", () => {
        it("repository is assigned", () => {
            const app = new GetUserApp(repoMock.object());

            expect(app.repository).to.equal(repoMock.object());
        });
    });

    describe("run", () => {
        it("Providing a name results in a user object being returned", async () => {
            const event = new ApiGatewayEventMock();
            event.body = '{"username": "Robin_Braumann"}';

            const app = new GetUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("statusCode");
            expect(response).to.have.property("body");
            expect(response.statusCode).to.equal(201);
            expect(response.body || "").to.equal(JSON.stringify(userResponse));
        });
    });
});
