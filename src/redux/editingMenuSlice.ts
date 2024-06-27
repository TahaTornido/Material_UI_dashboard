import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	value: false,
	EditedPatient: 0,
};

export const editingMenuSlice = createSlice({
	name: "editingMenu",
	initialState,
	reducers: {
		isEditingMenuActive: (state) => {
			state.value = !state.value;
		},
		wichPatientIsEditing: (state, action: PayloadAction<number>) => {
			state.EditedPatient = action.payload;
		},
	},
});

export const { isEditingMenuActive, wichPatientIsEditing } = editingMenuSlice.actions;

export default editingMenuSlice.reducer;
