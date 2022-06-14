import { expect } from "chai";
import "mocha";
import { Mock } from "moq.ts";
import { LoginUserApp } from "../../src/apps/login-user-app";
import { ApiGatewayResponse } from "../../src/common/apigateway/apigateway-response";
import { UserRepository } from "../../src/common/user";
import { LoginResponse } from "../../src/common/user/userResponse";
import { ApiGatewayEventMock } from "../mocks/apigateway-event-mock";

describe("UserLogin instance", () => {
    const JWT =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJqb3JnemVuIiwiaWF0IjoxNjU1MTIzNDcxfQ.9f0Up7S_glz_6xL7U717D30Ck-37LiE9hloKK2nuXQI";

    const repoMock = new Mock<UserRepository>()
        .setup((instance) => instance.loginUser("Robin_Braumann", "Hallo123"))
        .returns(
            new Promise<LoginResponse>((resolve) => {
                resolve({
                    JWT,
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

        it("Logging with JWT returns 201 and JWT", async () => {
            const jwtRepoMock = new Mock<UserRepository>()
                .setup((instance) => instance.loginUserWithJWT(JWT))
                .returns(
                    new Promise<LoginResponse>((resolve) => {
                        resolve({
                            JWT,
                        });
                    }),
                );

            const app = new LoginUserApp(jwtRepoMock.object());

            const event = new ApiGatewayEventMock();
            event.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT}`,
            };

            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");
            expect(response.body).to.equal(JSON.stringify({ JWT }));
            expect(response.statusCode).to.equal(201);
        });
    });
});
