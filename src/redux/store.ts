import { configureStore } from "@reduxjs/toolkit";
import refreshDataSlice from "./refreshDataSlice";
import editingMenuSlice from "./editingMenuSlice";
import allPatientsSlice from "./allPatientsSlice";
import addingPatientMenuSlice from "./addingMenuSlice";
import activeMenuSlice from "./activeMenuSlice";
import popOutsSlice from "./popOutsSlice";

export const store = configureStore({
	reducer: {
		refreshDataSlice: refreshDataSlice,
		editingMenuSlice: editingMenuSlice,
		allPatientsSlice: allPatientsSlice,
		addingPatientMenuSlice: addingPatientMenuSlice,
		activeMenuSlice: activeMenuSlice,
		popOutsSlice: popOutsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
