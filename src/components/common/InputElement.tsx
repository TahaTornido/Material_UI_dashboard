import { InputItemProps } from "../../types/propsTypes";

const InputElement = ({ input, value, handleInputChange }: InputItemProps) => {
	return (
		<>
			<label htmlFor={input.name} className="mt-2">
				{input.name}
			</label>
			<input
				id={input.name}
				name={input.name}
				type="text"
				placeholder={input.name}
				className=" rounded-xl p-1"
				onChange={handleInputChange}
				value={value}
			></input>
		</>
	);
};

export default InputElement;
