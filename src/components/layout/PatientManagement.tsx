import { useDispatch } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { IoPrintOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import { isAddingPatientMenuActive } from "../../redux/addingMenuSlice";
import { setSearchPatient } from "../../redux/allPatientsSlice";

const PatientManagement = () => {
	const dispatch = useDispatch();
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchPatient(e.target.value));
	};

	return (
		<section className="flex items-center justify-between px-5 py-3 text-sm font-light">
			<input
				type="text"
				placeholder="Find Patient by last name"
				onChange={handleSearchChange}
				className="w-32 rounded-xl border-2 border-gray-500 px-2 py-1 lg:h-12 lg:w-[25rem] lg:text-lg"
			/>
			<div className="flex items-center">
				<div className="mr-3 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-xl border-2 border-gray-400 text-3xl lg:flex">
					<RiFileExcel2Line />
				</div>
				<div className="mr-3 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-xl border-2 border-gray-400 text-3xl lg:flex">
					<IoPrintOutline />
				</div>
				<div
					className="flex cursor-pointer items-center rounded-xl border-2 border-green-500 bg-green-50 px-2 py-1 text-green-500 lg:h-12 lg:w-[20rem] lg:text-lg"
					onClick={() => dispatch(isAddingPatientMenuActive())}
				>
					<IoMdAdd />
					<p>Add new Patient</p>
				</div>
			</div>
		</section>
	);
};

export default PatientManagement;
