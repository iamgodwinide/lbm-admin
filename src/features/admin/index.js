import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;