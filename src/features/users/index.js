import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    pendingUsers: []
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUsers: (state, { payload }) => {
            state.users = payload
        },
        updatePendingUsers: (state, { payload }) => {
            state.pendingUsers = payload
        }
    }
})

export const { updateUsers, updatePendingUsers } = userSlice.actions;
export default userSlice.reducer;