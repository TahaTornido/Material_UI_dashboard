import { NavItemProps } from "../../types/propsTypes";

const NavigationItem = ({ item }: NavItemProps) => {
	return (
		<li className=" my-3 cursor-pointer rounded-2xl p-4 text-3xl text-white transition-all hover:bg-white hover:text-SeaBlue lg:text-4xl">
			{<item.icon />}
		</li>
	);
};

export default NavigationItem;
