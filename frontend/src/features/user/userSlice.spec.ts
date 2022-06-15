import userReducer, { UserState, setUser, setScore, setState, setJWT, User, setLoggedIn } from "./userSlice";

describe("counter reducer", () => {
    const initialState: User = {
        username: "",
        score: 0,
        state: UserState.CAN_GUESS,
        JWT: "",
        isLoggedIn: false,
    };
    it("should handle initial state", () => {
        expect(userReducer(undefined, { type: "unknown" })).toEqual({
            username: "",
            score: 0,
            state: UserState.CAN_GUESS,
            JWT: "",
            isLoggedIn: false,
        });
    });

    it("should set user", () => {
        const actual = userReducer(
            initialState,
            setUser({
                username: "bjorgzen",
                score: 1,
                state: UserState.GUESSING,
                JWT: "Some_JWT_token",
                isLoggedIn: true,
            }),
        );
        expect(actual).toEqual({
            username: "bjorgzen",
            score: 1,
            state: UserState.GUESSING,
            JWT: "Some_JWT_token",
            isLoggedIn: true,
        });
    });

    it("should set score", () => {
        const actual = userReducer(initialState, setScore(100));
        expect(actual.score).toEqual(100);
    });

    it("should set state", () => {
        const actual = userReducer(initialState, setState(UserState.GUESSING));
        expect(actual.state).toEqual(UserState.GUESSING);
    });

    it("should set JWT", () => {
        const actual = userReducer(initialState, setJWT("Some_JWT_token"));
        expect(actual.JWT).toEqual("Some_JWT_token");
    });

    it("should set user as logged in", () => {
        const actual = userReducer(initialState, setLoggedIn(true));
        expect(actual.isLoggedIn).toEqual(true);
    });
});
