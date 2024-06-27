import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addedPatient: false,
	deletedPatient: false,
	editedPatient: false,
	processingData: false,
};

export const popOutsSlice = createSlice({
	name: "popOuts",
	initialState,
	reducers: {
		isPatientAdded: (state) => {
			state.addedPatient = !state.addedPatient;
		},
		isPatientDeleted: (state) => {
			state.deletedPatient = !state.deletedPatient;
		},
		isPatientEdited: (state) => {
			state.editedPatient = !state.editedPatient;
		},
		isProcessing: (state) => {
			state.processingData = !state.processingData;
		},
	},
});

export const { isPatientAdded, isPatientDeleted, isPatientEdited, isProcessing } =
	popOutsSlice.actions;

export default popOutsSlice.reducer;
