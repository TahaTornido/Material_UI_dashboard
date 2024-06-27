import InputElement from "../common/InputElement";
import { inputs } from "../../constans";
import { IoMdClose } from "react-icons/io";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { refresh } from "../../redux/refreshDataSlice";
import { isEditingMenuActive } from "../../redux/editingMenuSlice";
import { useState } from "react";
import { PatientData } from "../../types/common";
import { isPatientEdited, isProcessing } from "../../redux/popOutsSlice";

const EditPatient = () => {
	const dispatch = useDispatch();
	const editedPatientId = useSelector((state: RootState) => state.editingMenuSlice.EditedPatient);
	const patients = useSelector((state: RootState) => state.allPatientsSlice.patients);
	const active = useSelector((state: RootState) => state.editingMenuSlice.value);
	const dataProcessing = useSelector((state: RootState) => state.popOutsSlice.processingData);

	const patientToEdit = patients.find((p) => p.id === editedPatientId);

	const [patientData, setPatientData] = useState<PatientData>({
		FirstName: "",
		LastName: "",
		Pesel: "",
		Street: "",
		City: "",
		ZipCode: "",
	});

	useEffect(() => {
		if (patientToEdit) {
			setPatientData({
				FirstName: patientToEdit.FirstName,
				LastName: patientToEdit.LastName,
				Pesel: patientToEdit.Pesel,
				Street: patientToEdit.Street,
				City: patientToEdit.City,
				ZipCode: patientToEdit.ZipCode,
			});
		}
	}, [patientToEdit]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPatientData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (dataProcessing) return;
		e.preventDefault();
		fetch(`http://localhost:3000/patients/${editedPatientId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(patientData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to update the patient");
				}
				return response.json();
			})
			.then(() => {
				dispatch(refresh());
				dispatch(isEditingMenuActive());
				dispatch(isPatientEdited());
				dispatch(isProcessing());
				setTimeout(() => {
					dispatch(isProcessing());
					dispatch(isPatientEdited());
				}, 2000);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<section
			className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-SeaBlue bg-CustomGrey lg:w-96 ${active ? "block" : "hidden"}`}
		>
			<div className="cursor-pointer pt-2 text-4xl" onClick={() => dispatch(isEditingMenuActive())}>
				<IoMdClose />
			</div>
			<form className="flex flex-col p-2" onSubmit={handleSubmit}>
				{inputs.map((input, index) => (
					<InputElement
						key={index}
						input={input}
						value={patientData[input.name] || ""}
						handleInputChange={handleInputChange}
					/>
				))}
				<button type="submit" className="mt-3 h-10 w-36 rounded-xl bg-SeaBlue text-white">
					Save Changes
				</button>
			</form>
		</section>
	);
};

export default EditPatient;
