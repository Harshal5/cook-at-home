import React from "react";
import { useField } from "formik";
import { TextField, Checkbox } from "@material-ui/core";

export const FormTextField = ({ label, children, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<TextField
			label={label}
			error={meta.touched && meta.error ? true : false}
			helperText={meta.touched && meta.error}
			{...field}
			{...props}
		/>
	);
};

export const FormSelectField = ({ label, children, onChange, ...props }) => {
	const [field, meta] = useField(props);
	// const [state, setState] = useState("");
	return (
		<TextField
			label={label}
			error={meta.touched && meta.error ? true : false}
			helperText={meta.touched && meta.error}
			select
			{...field}
			{...props}
		>
			{children}
		</TextField>
	);
};

export const FormDateTimeField = ({ label, children, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextField
			error={meta.touched && meta.error ? true : false}
			helperText={meta.touched && meta.error}
			type="datetime-local"
			{...field}
			{...props}
		/>
	);
};

export const FormCheckbox = ({ children, ...props }) => {
	const [field, meta] = useField({ ...props, type: "checkbox" });

	return (
		<Checkbox
			error={meta.touched && meta.error ? true : false}
			helperText={meta.touched && meta.error}
			{...field}
			{...props}
		/>
	);
};
