import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Patient {
	id: number;
	FirstName: string;
	LastName: string;
	Pesel: string;
	Street: string;
	City: string;
	ZipCode: string;
}

const initialState: { patients: Patient[]; searchPatient: string } = {
	patients: [],
	searchPatient: "",
};

export const allPatientsSlice = createSlice({
	name: "allPatients",
	initialState,
	reducers: {
		setPatients: (state, action: PayloadAction<Patient[]>) => {
			state.patients = action.payload;
		},
		setSearchPatient: (state, action: PayloadAction<string>) => {
			state.searchPatient = action.payload;
		},
	},
});

export const { setPatients, setSearchPatient } = allPatientsSlice.actions;

export default allPatientsSlice.reducer;
