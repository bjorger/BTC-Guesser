import "mocha";
import { expect } from "chai";
import { Mock } from "moq.ts";
import { ApiGatewayResponse } from "../../src/common/apigateway/apigateway-response";
import { ApiGatewayEventMock } from "../mocks/apigateway-event-mock";
import { GuessRepository, GuessResponse } from "../../src/common/guess/";
import { BitcoinGuesserApp } from "../../src/apps/bitcoin-guesser-app";
import { ERROR_INVALID_GUESS_OPTIONS, ERROR_JWT_MISSING } from "../../src/common/errors";

describe("PlaceGuess instance", () => {
    const JWT =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJqb3JnemVuIiwiaWF0IjoxNjU1MTIzNDcxfQ.9f0Up7S_glz_6xL7U717D30Ck-37LiE9hloKK2nuXQI";

    const repoMock = new Mock<GuessRepository>()
        .setup((instance) => instance.placeGuess(JWT, 0))
        .returns(
            new Promise<GuessResponse>((resolve) => {
                resolve({
                    guess: {
                        id: "b827f29b-7bf8-478b-aa2f-15bd37f5a32e",
                        username: "bjorgzen",
                        btcPrice: 20288,
                        guess: 0,
                        createdAt: "2022-06-14T01:44:22.919Z",
                    },
                    userState: 1,
                });
            }),
        );

    describe("constructor", () => {
        it("repository is assigned", () => {
            const app = new BitcoinGuesserApp(repoMock.object());

            expect(app.repository).to.equal(repoMock.object());
        });
    });

    describe("run", () => {
        it("Missing JWT results in an 401", async () => {
            const event = new ApiGatewayEventMock();
            event.headers = {
                "Content-Type": "application/json",
                Authorization: "",
            };

            const app = new BitcoinGuesserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");
            expect(response.body).to.equal(ERROR_JWT_MISSING);
            expect(response.statusCode).to.equal(401);
        });

        it("Invalid value for guess results in a 500", async () => {
            const guessMock = new Mock<GuessRepository>()
                .setup((instance) => instance.placeGuess(JWT, -1))
                .throws(new Error(ERROR_INVALID_GUESS_OPTIONS));

            const event = new ApiGatewayEventMock();
            event.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT}`,
            };
            event.body = '{"guess": -1}';

            const app = new BitcoinGuesserApp(guessMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");
            expect(response.body).to.equal(ERROR_INVALID_GUESS_OPTIONS);
            expect(response.statusCode).to.equal(500);
        });

        it("Invalid value for guess results in a 500", async () => {
            const guessMock = new Mock<GuessRepository>()
                .setup((instance) => instance.placeGuess(JWT, -1))
                .throws(new Error(ERROR_INVALID_GUESS_OPTIONS));

            const event = new ApiGatewayEventMock();
            event.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT}`,
            };
            event.body = '{"guess": -1}';

            const app = new BitcoinGuesserApp(guessMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");
            expect(response.body).to.equal(ERROR_INVALID_GUESS_OPTIONS);
            expect(response.statusCode).to.equal(500);
        });

        it("placeGuess returns 201", async () => {
            const event = new ApiGatewayEventMock();
            event.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT}`,
            };
            event.body = '{"guess": 0}';

            const app = new BitcoinGuesserApp(repoMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");
            expect(response.statusCode).to.equal(201);
        });
    });
});
