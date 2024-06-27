import AddPatient from "./components/layout/AddPatient";
import EditPatient from "./components/layout/EditPatient";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Navigation";
import PatientManagement from "./components/layout/PatientManagement";
import PatientsTable from "./components/layout/PatientsTable";
import PopOuts from "./components/layout/PopOuts";

function App() {
	return (
		<div className="box-border flex flex-col overflow-hidden font-Roboto">
			<Nav />
			<div className="lg:ml-32">
				<Header />
				<div className="w-full  bg-CustomGrey">
					<PatientManagement />
					<PatientsTable />
					<AddPatient />
					<EditPatient />
					<PopOuts />
				</div>
			</div>
		</div>
	);
}

export default App;
