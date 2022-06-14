import "mocha";
import { expect } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Mock, Times } from "moq.ts";
import { ApiGatewayResponse } from "../../src/common/apigateway/apigateway-response";
import { ApiGatewayEventMock } from "../mocks/apigateway-event-mock";
import { UserState, UserResponse, UserRepository, UserDynamoClientRepository } from "../../src/common/user";
import { CreateUserApp } from "../../src/apps/create-user-app";
import { ERROR_COULD_NOT_CREATE_USER, ERROR_PASSWORD_TOO_SHORT, ERROR_USERNAME_TOO_SHORT } from "../../src/common/errors";
import { DynamoDB } from "aws-sdk";

chai.use(chaiAsPromised);

describe("UserCreate instance", () => {
    const client = new UserDynamoClientRepository();
    const repoMock = new Mock<UserRepository>()
        .setup((instance) => instance.createUser("Robin_Braumann", "Hallo123"))
        .returns(
            new Promise<UserResponse>((resolve) => {
                resolve({
                    username: "Robin_Braumann",
                    state: UserState.CAN_GUESS,
                    score: 0,
                });
            }),
        );

    describe("constructor", () => {
        it("repository is assigned", () => {
            const app = new CreateUserApp(repoMock.object());

            expect(app.repository).to.equal(repoMock.object());
        });
    });

    describe("client instance", () => {
        it("Values of client are set in constructor", async () => {
            expect(client.docClient).to.be.instanceOf(DynamoDB.DocumentClient);
            expect(client.secret).to.be.a("string");
            expect(client.userTable).to.be.a("string");
        });

        it("A username with less than 7 characters results into an error", async () => {
            await expect(client.createUser("", "")).to.be.rejectedWith(Error);
        });

        it("A password with less than 7 characters results into an error", async () => {
            await expect(client.createUser("bjorgzen", "")).to.be.rejectedWith(Error);
        });
    });

    describe("run", () => {
        it('path parameter missing "password" returns 404 status code', async () => {
            const event = new ApiGatewayEventMock();
            event.body = '{"username": "Robin_Braumann"}';

            const app = new CreateUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("statusCode");
            expect(response.statusCode).to.equal(422);
        });

        it("repository is called to create a user", async () => {
            const event = new ApiGatewayEventMock();

            const app = new CreateUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            repoMock.verify((instance) => instance.createUser("Robin_Braumann", "Hallo123"), Times.Once());
            if (!response.body) {
                expect.fail("expected a response body to be present");
            }

            const res: UserResponse = JSON.parse(response.body) as UserResponse;
            expect(res.username).to.equal("Robin_Braumann");
        });

        it("App returns error code 500 when username is too short", async () => {
            const repoMock = new Mock<UserRepository>()
                .setup((instance) => instance.createUser("Robin", "Hallo1234"))
                .throws(new Error(ERROR_USERNAME_TOO_SHORT));

            const event = new ApiGatewayEventMock();
            event.body = '{"username": "Robin", "password": "Hallo1234"}';

            const app = new CreateUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("statusCode");
            expect(response).to.have.property("body");
            expect(response.statusCode).to.equal(500);
            expect(response.body).to.equal(ERROR_USERNAME_TOO_SHORT);
        });

        it("App returns error code 500 when password is too short", async () => {
            const repoMock = new Mock<UserRepository>()
                .setup((instance) => instance.createUser("Robin_Braumann", "Hallo4"))
                .throws(new Error(ERROR_PASSWORD_TOO_SHORT));

            const event = new ApiGatewayEventMock();
            event.body = '{"username": "Robin_Braumann", "password": "Hallo4"}';

            const app = new CreateUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("statusCode");
            expect(response).to.have.property("body");
            expect(response.statusCode).to.equal(500);
            expect(response.body).to.equal(ERROR_PASSWORD_TOO_SHORT);
        });

        it("App returns error code 500 when password is too short", async () => {
            const repoMock = new Mock<UserRepository>()
                .setup((instance) => instance.createUser("Robin_Braumann", "Hallo123"))
                .throws(new Error(ERROR_COULD_NOT_CREATE_USER));

            const event = new ApiGatewayEventMock();
            event.body = '{"username": "Robin_Braumann", "password": "Hallo123"}';

            const app = new CreateUserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("statusCode");
            expect(response).to.have.property("body");
            expect(response.statusCode).to.equal(500);
            expect(response.body).to.equal(ERROR_COULD_NOT_CREATE_USER);
        });
    });
});
