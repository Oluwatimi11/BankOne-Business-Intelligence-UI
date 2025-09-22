import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VisibilityState = {
    isSideBarOpen: boolean;
};

const initialState: VisibilityState = {
    isSideBarOpen: false,
};

const visibilitySlice = createSlice({
    name: "visibility",
    initialState,
    reducers: {
        toggleSideBar: (state) => {
            state.isSideBarOpen = !state.isSideBarOpen;
        },
        setSideBar: (state, action: PayloadAction<boolean>) => {
            state.isSideBarOpen = action.payload;
        },
    },
});

export const visibilityStore = {
    action: visibilitySlice.actions,
    reducer: visibilitySlice.reducer,
};
