import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: false,
};

export const activeMenuSlice = createSlice({
	name: "activeMenu",
	initialState,
	reducers: {
		active: (state) => {
			state.value = !state.value;
		},
	},
});

export const { active } = activeMenuSlice.actions;

export default activeMenuSlice.reducer;
