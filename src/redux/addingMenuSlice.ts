import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: false,
};

export const addingPatientMenuSlice = createSlice({
	name: "addingPatientMenu",
	initialState,
	reducers: {
		isAddingPatientMenuActive: (state) => {
			state.value = !state.value;
		},
	},
});

export const { isAddingPatientMenuActive } = addingPatientMenuSlice.actions;

export default addingPatientMenuSlice.reducer;
