import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    devotionals: []
};

const devotionalSlice = createSlice({
    name: "devotionals",
    initialState,
    reducers: {
        updateDevotionals: (state, { payload }) => {
            state.devotionals = payload
        }
    }
})

export const { updateDevotionals } = devotionalSlice.actions;
export default devotionalSlice.reducer;