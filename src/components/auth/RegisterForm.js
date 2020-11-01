import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormTextField } from "../FormComponents/FormComponents";
import {
	makeStyles,
	Container,
	Grid,
	Avatar,
	Typography,
	Button,
	CssBaseline,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
}));

const RegisterForm = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const initialValues = {
		firstName: "",
		lastName: "",
		mobile: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const validationSchema = Yup.object({
		firstName: Yup.string().required("First Name is required"),
		lastName: Yup.string().required("Last Name is required"),
		mobile: Yup.number()
			.min(1000000000, "Mobile no should be atleast 10 digit long")
			.max(9999999999, "Mobile no should be atmost 10 digit long")
			.required("Mobile Number is required"),
		email: Yup.string()
			.required("Email is required")
			.email("Not a valid email"),
		password: Yup.string().required("Password is required"),
		confirmPassword: Yup.string()
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password"), null], "Passwords must match"),
	});

	// history.listen(() => props.removeError());

	const handleSubmit = (formValues) => {
		console.log(formValues);
		props
			.register(formValues)
			.then(() => {
				history.push("/");
			})
			.catch(() => {
				return;
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				{props.user.error && (
					<Alert severity="error" className={classes.error}>
						{props.user.error.message}
					</Alert>
				)}
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => handleSubmit(values)}
				>
					<Form className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<FormTextField
									autoComplete="fname"
									required
									name="firstName"
									variant="outlined"
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormTextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormTextField
									variant="outlined"
									required
									fullWidth
									id="mobile"
									label="Mobile Number"
									name="mobile"
									autoComplete="mobile"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormTextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormTextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormTextField
									variant="outlined"
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to="/auth/signin" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</Container>
	);
};

export default RegisterForm;
