import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PopOuts = () => {
	const isPatientAdded = useSelector((state: RootState) => state.popOutsSlice.addedPatient);
	const isPatientDeleted = useSelector((state: RootState) => state.popOutsSlice.deletedPatient);
	const isPatientEdited = useSelector((state: RootState) => state.popOutsSlice.editedPatient);

	return (
		<>
			<div
				className={`fixed left-1/2 flex h-12 w-64 -translate-x-1/2 items-center justify-center rounded-full bg-emerald-400 font-bold text-white transition-all ${isPatientAdded ? `bottom-5` : `-bottom-16`}`}
			>
				You have added patient!!!
			</div>
			<div
				className={`fixed left-1/2 flex h-12 w-64 -translate-x-1/2 items-center justify-center rounded-full bg-red-500 font-bold text-white transition-all ${isPatientDeleted ? `bottom-5` : `-bottom-16`}`}
			>
				You have Deleted patient!!!
			</div>
			<div
				className={`fixed  left-1/2 flex h-12 w-64 -translate-x-1/2 items-center justify-center rounded-full bg-sky-500 font-bold text-white transition-all ${isPatientEdited ? `bottom-5` : `-bottom-16`}`}
			>
				You have Edited patient!!!
			</div>
		</>
	);
};

export default PopOuts;
