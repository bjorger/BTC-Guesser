import { expect } from "chai";
import "mocha";
import { Mock } from "moq.ts";
import { LoginUserApp } from "../../src/apps/login-user-app";
import { UserRepository, UserResponse, UserState } from "../../src/common/user";

describe("UserLogin instance", () => {
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
            const app = new LoginUserApp(repoMock.object());

            expect(app.repository).to.equal(repoMock.object());
        });
    });
});
