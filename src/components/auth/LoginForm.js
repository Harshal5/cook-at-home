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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	seperator: {
		margin: theme.spacing(1, 15),
	},
}));

const LoginForm = (props) => {
	console.log(props);
	const classes = useStyles();
	const history = useHistory();
	const initialValues = { email: "", password: "", remember: true };
	const validationSchema = Yup.object({
		email: Yup.string()
			.required("E-mail is required")
			.email("Not a valid E-mail"),
		password: Yup.string().required("Password is required"),
		remember: Yup.boolean(),
	});

	// history.listen(() => props.removeError());

	const handleSubmit = (formValues) => {
		console.log(formValues);
		props
			.login(props.userType, formValues)
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
					Sign in
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
						<FormTextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<FormTextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<FormCheckbox
									name="remember"
									id="remember"
									color="primary"
								/>
							}
							label="Remember me"
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
						<Grid container>
							<Grid item xs>
								<Link to="/auth/forgot" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to="/auth/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						{/* <Divider className={classes.seperator} />
              <Link
                to={`/auth/signin${
                  props.userType === 'student' ? '?userType=admin' : ''
                }`}>
                <Typography font-weight="fontWeightBold">
                  Login as {props.userType === 'student' ? 'Admin' : 'Student'}
                </Typography>
              </Link>
            </Grid> */}
					</Form>
				</Formik>
			</div>
		</Container>
	);
};

export default LoginForm;
