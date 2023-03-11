import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    messages: []
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        updateMessages: (state, { payload }) => {
            state.messages = payload
        }
    }
})

export const { updateMessages } = messagesSlice.actions;
export default messagesSlice.reducer;