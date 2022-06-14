import "mocha";
import { expect } from "chai";
import { Mock } from "moq.ts";
import { ApiGatewayResponse } from "../../src/common/apigateway/apigateway-response";
import { GuessRepository, Guess, GuessDynamoClientRepository, GuessOptions } from "../../src/common/guess/";
import { ERROR_BODY_MISSING_GUESS_ID, ERROR_BODY_MISSING_USERNAME } from "../../src/common/errors";
import { EvaluateGuessApp } from "../../src/apps/evaluate-guess-app";
import { ApiGatewayInvokeEventMock } from "../mocks/apigateway-invocation-mock";

describe("EvaluateGuess instance", () => {
    const repo = new GuessDynamoClientRepository();

    const repoMock = new Mock<GuessRepository>()
        .setup((instance) => instance.evaluateGuess("bjorgzen", "b827f29b-7bf8-478b-aa2f-15bd37f5a32e"))
        .returns(
            new Promise<number>((resolve) => {
                resolve(-1);
            }),
        );

    describe("constructor", () => {
        it("repository is assigned", () => {
            const app = new EvaluateGuessApp(repoMock.object());

            expect(app.repository).to.equal(repoMock.object());
        });
    });

    describe("run", () => {
        it("Empty guessId results in 500", async () => {
            const guessMock = new Mock<GuessRepository>()
                .setup((instance) => instance.evaluateGuess("bjorgzen", ""))
                .throws(new Error(ERROR_BODY_MISSING_GUESS_ID));

            const event = new ApiGatewayInvokeEventMock();
            event.username = "bjorgzen";
            event.guessId = "";

            const app = new EvaluateGuessApp(guessMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");
            expect(response.body).to.equal(ERROR_BODY_MISSING_GUESS_ID);
            expect(response.statusCode).to.equal(500);
        });

        it("Empty username results in 500", async () => {
            const guessMock = new Mock<GuessRepository>()
                .setup((instance) => instance.evaluateGuess("", "b827f29b-7bf8-478b-aa2f-15bd37f5a32e"))
                .throws(new Error(ERROR_BODY_MISSING_USERNAME));

            const event = new ApiGatewayInvokeEventMock();
            event.username = "";
            event.guessId = "b827f29b-7bf8-478b-aa2f-15bd37f5a32e";

            const app = new EvaluateGuessApp(guessMock.object());
            const response: ApiGatewayResponse = await app.run(event);

            expect(response).to.have.property("body");
            expect(response).to.have.property("statusCode");
            expect(response.body).to.equal(ERROR_BODY_MISSING_USERNAME);
            expect(response.statusCode).to.equal(500);
        });

        it("Correct guess returns 1", async () => {
            const guess = new Guess("bjorgzen", 9000, GuessOptions.UP);
            const result = repo.evaluate(10000, guess);

            expect(result).to.equal(1);
        });

        it("Wrong guess returns -1", async () => {
            const guess = new Guess("bjorgzen", 9000, GuessOptions.DOWN);
            const result = repo.evaluate(10000, guess);

            expect(result).to.equal(-1);
        });
    });
});
