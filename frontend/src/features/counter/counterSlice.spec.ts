import userReducer, { UserState, setUser, setScore, setState, User } from "./counterSlice";

describe("counter reducer", () => {
    const initialState: User = {
        username: "",
        score: 0,
        state: UserState.CAN_GUESS,
    };
    it("should handle initial state", () => {
        expect(userReducer(undefined, { type: "unknown" })).toEqual({
            username: "",
            score: 0,
            state: UserState.CAN_GUESS,
        });
    });

    it("should set user", () => {
        const actual = userReducer(
            initialState,
            setUser({
                username: "bjorgzen",
                score: 1,
                state: UserState.GUESSING,
            }),
        );
        expect(actual).toEqual({
            username: "bjorgzen",
            score: 1,
            state: UserState.GUESSING,
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
});
