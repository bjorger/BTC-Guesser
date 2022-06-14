import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export enum UserState {
    CAN_GUESS,
    GUESSING,
}

export interface User {
    username: string;
    score: number;
    state: UserState;
}

const initialState: User = {
    username: "",
    score: 0,
    state: UserState.CAN_GUESS,
};

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            Object.assign(state, action.payload);
        },
        setScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload;
        },
        setState: (state, action: PayloadAction<UserState>) => {
            state.state = action.payload;
        },
    },
});

export const { setUser, setScore, setState } = userSlice.actions;

export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
