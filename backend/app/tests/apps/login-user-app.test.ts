import { expect } from "chai";
import "mocha";
import { Mock } from "moq.ts";
import { LoginUserApp } from "../../src/apps/login-user-app";
import { ApiGatewayResponse } from "../../src/common/apigateway/apigateway-response";
import { UserRepository } from "../../src/common/user";
import { LoginResponse } from "../../src/common/user/userResponse";
import { ApiGatewayEventMock } from "../mocks/apigateway-event-mock";

describe("UserLogin instance", () => {
    const repoMock = new Mock<UserRepository>()
        .setup((instance) => instance.loginUser("Robin_Braumann", "Hallo123"))
        .returns(
            new Promise<LoginResponse>((resolve) => {
                resolve({
                    JWT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJqb3JnemVuIiwiaWF0IjoxNjU1MTE5MDUyLCJleHAiOjE2NTUxMjI2NTJ9.DXavDIHjW_RYZlj6-NgjWXMHFqdUnqFepx8FKCRt5RY",
                });
            }),
        );

    describe("constructor", () => {
        it("repository is assigned", () => {
            const app = new LoginUserApp(repoMock.object());

            expect(app.repository).to.equal(repoMock.object());
        });
    });

    describe("run", () => {
        it("Not prodiving a password results in a 422", async () => {
            const event = new ApiGatewayEventMock();
            event.body = '{"username": "Robin_Braumann"}';

            const app = new LoginUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("statusCode");
            expect(response.statusCode).to.equal(422);
        });

        it("Successful logging returns a 201", async () => {
            const event = new ApiGatewayEventMock();
            const app = new LoginUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");

            const body = JSON.parse(response.body || "");

            expect(body).to.have.property("JWT");
            expect(response.statusCode).to.equal(201);
        });
    });
});
