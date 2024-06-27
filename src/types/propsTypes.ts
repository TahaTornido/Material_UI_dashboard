import { IconType } from "react-icons";

export interface NavItemProps {
	item: {
		icon: IconType;
	};
}
export interface InputItemProps {
	input: {
		name: string;
	};
	value: string;
	handleInputChange: (e: any) => void;
}
