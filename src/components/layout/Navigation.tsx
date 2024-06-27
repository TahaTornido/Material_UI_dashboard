import { nav } from "../../constans";
import NavigationItem from "../common/NavigationItem";
import { IoMdMedical } from "react-icons/io";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { active } from "../../redux/activeMenuSlice";

const Navigation = () => {
	const dispatch = useDispatch();

	const isActive = useSelector((state: RootState) => state.activeMenuSlice.value);

	return (
		<nav
			className={`fixed  h-full min-h-screen w-24 overflow-y-auto bg-SeaBlue ${isActive ? `ml-0` : `-ml-24`} transition-all lg:ml-0 lg:w-32`}
		>
			<div className="flex h-full flex-col items-center justify-between pt-6">
				<div
					className="mb-5 cursor-pointer text-4xl text-emerald-500 lg:text-5xl"
					onClick={() => dispatch(active())}
				>
					<IoMdMedical />
				</div>
				<ul>
					{nav.map((item, id) => (
						<NavigationItem item={item} key={id} />
					))}
				</ul>
				<div className="mt-5 cursor-pointer pb-6 text-4xl text-red-600 lg:text-5xl">
					<RiDeleteBack2Line />
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
