import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    series: []
};

const seriesSlice = createSlice({
    name: "series",
    initialState,
    reducers: {
        updateSeries: (state, { payload }) => {
            state.series = payload
        }
    }
})

export const { updateSeries } = seriesSlice.actions;
export default seriesSlice.reducer;