import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Icon from "@material-ui/core/Icon";
import { API } from "../../services/api";

const getModalStyle = () => {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
};

const useStyles = makeStyles((theme) => ({
	mainFeaturedPost: {
		position: "relative",
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	},
	overlay: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: "rgba(0,0,0,.3)",
	},
	mainFeaturedPostContent: {
		position: "relative",
		padding: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
	paper: {
		position: "absolute",
		// width: 400,
		backgroundColor: theme.palette.background.paper,
		// boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const MainHeading = ({ user_id, price, post }) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
		let res = API.post("/orders", {
			user_id,
			bill: price,
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<Typography variant="h4" id="simple-modal-title">
				Thank you for ordering
			</Typography>
			{/* <Icon className="fa fa-smile-beam" color="primary" /> */}
			<p>
				<Icon
					style={{ height: "100px", width: "100px" }}
					className="far fa-smile-beam"
					color="primary"
				/>
			</p>
		</div>
	);

	return (
		<Paper
			className={classes.mainFeaturedPost}
			style={{ backgroundImage: `url(${post.image})` }}
		>
			{/* Increase the priority of the hero background image */}
			{
				<img
					style={{ display: "none" }}
					src={post.image}
					alt={post.imageText}
				/>
			}
			<div className={classes.overlay} />
			<Grid container>
				<Grid item md={6}>
					<div className={classes.mainFeaturedPostContent}>
						<Typography
							component="h1"
							variant="h2"
							color="inherit"
							gutterBottom
						>
							{post.title}
						</Typography>
						<Typography
							variant="h6"
							align="left"
							color="inherit"
							paragraph
						>
							{post.description}
						</Typography>
						<Button
							variant="contained"
							color="primary"
							onClick={handleOpen}
						>
							Order Now
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
						>
							{body}
						</Modal>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
};

MainHeading.propTypes = {
	post: PropTypes.object,
};

export default MainHeading;
