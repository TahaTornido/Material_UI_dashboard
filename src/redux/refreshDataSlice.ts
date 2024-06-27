import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: false,
};

export const refreshAllDataSlice = createSlice({
	name: "refreshAllData",
	initialState,
	reducers: {
		refresh: (state) => {
			state.value = !state.value;
		},
	},
});

export const { refresh } = refreshAllDataSlice.actions;

export default refreshAllDataSlice.reducer;
