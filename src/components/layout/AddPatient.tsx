import InputElement from "../common/InputElement";
import { inputs } from "../../constans";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { isAddingPatientMenuActive } from "../../redux/addingMenuSlice";
import { refresh } from "../../redux/refreshDataSlice";
import { PatientData } from "../../types/common";
import { isPatientAdded, isProcessing } from "../../redux/popOutsSlice";

const AddPatient = () => {
	const dispatch = useDispatch();
	const active = useSelector((state: RootState) => state.addingPatientMenuSlice.value);
	const dataProcessing = useSelector((state: RootState) => state.popOutsSlice.processingData);
	const initialPatientData = {
		FirstName: "",
		LastName: "",
		Pesel: "",
		Street: "",
		City: "",
		ZipCode: "",
	};

	const [patientData, setPatientData] = useState<PatientData>(initialPatientData);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPatientData({ ...patientData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (dataProcessing) return;
		e.preventDefault();
		fetch("http://localhost:3000/patients", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(patientData),
		})
			.then((response) => {
				console.log(response);
				if (!response.ok) {
					return response.text().then((text) => {
						throw new Error(text);
					});
				}
				return response.json();
			})
			.then((data) => {
				setPatientData(initialPatientData);
				dispatch(refresh());
				console.log("Success:", data);
				dispatch(isAddingPatientMenuActive());
				dispatch(isPatientAdded());
				dispatch(isProcessing());
				setTimeout(() => {
					dispatch(isProcessing());
					dispatch(isPatientAdded());
				}, 2000);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<section
			className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-SeaBlue bg-CustomGrey lg:w-96 ${active ? `block` : `hidden`}`}
		>
			<div
				className="cursor-pointer pt-2 text-4xl"
				onClick={() => dispatch(isAddingPatientMenuActive())}
			>
				<IoMdClose />
			</div>
			<form className="flex flex-col p-2" onSubmit={handleSubmit}>
				{inputs.map((input, id) => (
					<InputElement
						input={input}
						key={id}
						value={patientData[input.name]}
						handleInputChange={handleInputChange}
					/>
				))}
				<button type="submit" className="mt-3 h-10 w-36 rounded-xl bg-SeaBlue text-white">
					Add patient
				</button>
			</form>
		</section>
	);
};

export default AddPatient;
