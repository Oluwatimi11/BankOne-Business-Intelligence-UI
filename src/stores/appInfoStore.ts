import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserData = {
    firstName: string;
    lastName: string;
};

type AppInfoState = {
    userData: UserData;
};

const initialState: AppInfoState = {
    userData: { firstName: "John", lastName: "Doe" },
};

const appInfoSlice = createSlice({
    name: "appInfo",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
        },
    },
});

export const appInfoStore = {
    action: appInfoSlice.actions,
    reducer: appInfoSlice.reducer,
};
