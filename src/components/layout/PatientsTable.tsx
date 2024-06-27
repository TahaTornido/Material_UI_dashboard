import { MdModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPatients } from "../../redux/allPatientsSlice";
import { RootState } from "../../redux/store";
import { refresh } from "../../redux/refreshDataSlice";
import { isEditingMenuActive, wichPatientIsEditing } from "../../redux/editingMenuSlice";
import { IoTriangle } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { isPatientDeleted, isProcessing } from "../../redux/popOutsSlice";

const PatientsTable = () => {
	const [isSorted, setIsSorted] = useState(false);
	const dispatch = useDispatch();
	const patients = useSelector((state: RootState) => state.allPatientsSlice.patients);
	const searchTerm = useSelector((state: RootState) => state.allPatientsSlice.searchPatient);
	const dataRefreshed = useSelector((state: RootState) => state.refreshDataSlice.value);
	const dataProcessing = useSelector((state: RootState) => state.popOutsSlice.processingData);

	const [markedPatients, setMarkedPatients] = useState<number[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3000/patients");
				if (!response.ok) {
					throw new Error(`not Working ${response.status}`);
				}
				const data = await response.json();
				dispatch(setPatients(data));
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [dataRefreshed]);

	const deletePatient = (patientId: number) => {
		if (dataProcessing) return;
		fetch(`http://localhost:3000/patients/${patientId}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Patient deleted", data);
				dispatch(refresh());
				dispatch(isPatientDeleted());
				dispatch(isProcessing());
				setTimeout(() => {
					dispatch(isProcessing());
					dispatch(isPatientDeleted());
				}, 2000);
			})
			.catch((error) => {
				console.error("There was an error deleting the patient", error);
			});
	};

	const editingPatient = (patientId: number) => {
		dispatch(isEditingMenuActive());
		dispatch(wichPatientIsEditing(patientId));
		console.log(patientId);
	};

	const handleSortToggle = () => {
		if (isSorted) {
			dispatch(setPatients([...patients].sort((a, b) => a.id - b.id)));
		} else {
			dispatch(setPatients([...patients].sort((a, b) => a.City.localeCompare(b.City))));
		}
		setIsSorted((prev) => !prev);
	};
	const toggleMarkPatient = (patientId: number) => {
		setMarkedPatients((prev) =>
			prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId],
		);
	};

	const visiblePatients = searchTerm
		? patients.filter((patient) =>
				patient.LastName.toLowerCase().includes(searchTerm.toLowerCase()),
			)
		: patients;

	return (
		<section className="px-5 py-3">
			<table className="print-only w-full text-sm">
				<thead className="border border-gray-300 text-center text-gray-400">
					<tr className="h-8">
						<td className="hidden lg:table-cell">No</td>
						<td className="hidden lg:table-cell">First Name</td>
						<td>Last Name</td>
						<td>Pesel</td>
						<td className="hidden lg:table-cell">Street</td>
						<td onClick={handleSortToggle} className="text-center">
							<div className="flex items-center justify-center">
								<div>City</div>
								<div
									className={`ml-1 cursor-pointer text-xs transition-all ${isSorted ? "rotate-180" : "rotate-0"}`}
								>
									<IoTriangle />
								</div>
							</div>
						</td>
						<td className="hidden lg:table-cell">Zip Code</td>
					</tr>
				</thead>
				<tbody className="bg-white text-center">
					{visiblePatients.map((patient, index) => (
						<tr
							className={`h-12 border-b ${markedPatients.includes(patient.id) ? `bg-green-200` : `bg-white`}`}
							key={index}
						>
							<td className="hidden  lg:table-cell">{index + 1}</td>
							<td className="hidden lg:table-cell">{patient.FirstName}</td>
							<td>{patient.LastName}</td>
							<td>{patient.Pesel}</td>
							<td className="hidden lg:table-cell">{patient.Street}</td>
							<td>{patient.City}</td>
							<td className="hidden lg:table-cell">{patient.ZipCode}</td>
							<td className="cursor-pointer text-2xl" onClick={() => editingPatient(patient.id)}>
								<MdModeEdit />
							</td>
							<td className="cursor-pointer text-2xl" onClick={() => deletePatient(patient.id)}>
								<MdOutlineDelete />
							</td>
							<td
								className="hidden cursor-pointer text-xl lg:table-cell"
								onClick={() => toggleMarkPatient(patient.id)}
							>
								{markedPatients.includes(patient.id) ? (
									<FaBookmark className="text-SeaBlue" />
								) : (
									<FaRegBookmark />
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default PatientsTable;
