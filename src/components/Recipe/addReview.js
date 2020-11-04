import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormTextField, FormCheckbox } from "../FormComponents/FormComponents";
import {
	makeStyles,
	Container,
	Grid,
	Avatar,
	Typography,
	Button,
	CssBaseline,
	FormControlLabel,
	Divider,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";

const LoginForm = (props) => {
	console.log(props);
	const classes = useStyles();
	const history = useHistory();
	const initialValues = { rating: 0, comment: "" };
	const validationSchema = Yup.object({
		rating: Yup.number()
			.required("Rating is required")
			.moreThan(0)
			.lessThan(6),
		comment: Yup.string(),
	});

	// history.listen(() => props.removeError());

	const handleSubmit = (formValues) => {
		console.log(formValues);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add A Review
				</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => handleSubmit(values)}
				>
					<Form className={classes.form}>
						<FormTextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="rating"
							label="Rating"
							name="rating"
							autoComplete="rating"
							autoFocus
						/>
						<FormTextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="comment"
							label="Comment"
							id="comment"
							autoComplete="comment"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
					</Form>
				</Formik>
			</div>
		</Container>
	);
};

export default LoginForm;
