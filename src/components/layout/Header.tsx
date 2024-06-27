import { RxHamburgerMenu } from "react-icons/rx";

import userImg from "../../assets/img/avatar.jpg";
import { useDispatch } from "react-redux";
import { active } from "../../redux/activeMenuSlice";

const Header = () => {
	const dispatch = useDispatch();
	const handleMenu = () => {
		dispatch(active());
	};
	return (
		<section className="flex items-center justify-between px-5 py-6">
			<div className="text-3xl lg:hidden" onClick={handleMenu}>
				<RxHamburgerMenu />
			</div>
			<h1 className="hidden text-2xl font-medium tracking-wide lg:block">Administator Panel</h1>
			<div className="flex lg:hidden">
				<p className="font-bold">Admin</p>
				<p>,Patryk</p>
			</div>
			<div className="hidden items-center lg:flex">
				<div className="mr-5 flex">
					<p className="font-bold">Admin</p>
					<p>,Patryk</p>
				</div>
				<img src={userImg} alt="img of user" className="h-10 w-10 rounded-full lg:h-12 lg:w-12" />
			</div>
		</section>
	);
};

export default Header;
