import React from "react";
import { connect } from "react-redux";
import {
	withStyles,
	Container,
	CssBaseline,
	Typography,
	Modal,
	Grid,
	List,
	ListItem,
} from "@material-ui/core";
import { fetchRecipeDetails } from "../../redux/recipeReducer/recipeActions";
import MainHeading from "./MainHeading";
import Main from "./Main";
import Reviews from "./Reviews";
import Divider from "@material-ui/core/Divider";

const styles = (theme) => ({
	root: {
		// margin: theme.spacing(4, 16),
		// display: 'flex'
	},
	mainGrid: {
		marginTop: theme.spacing(3),
	},
	heading: {
		margin: theme.spacing(5, 0),
	},
});

const featuredPosts = [
	{
		title: "Harshal Patil",
		date: "Nov 12",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
		image:
			"https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg",
		imageText: "Image Text",
	},
	{
		title: "Kanhaiya Madaswar",
		date: "Nov 11",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
		image:
			"https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg",
		imageText: "Image Text",
	},
];

class Recipe extends React.Component {
	componentDidMount() {
		this.props.fetchRecipeDetails(this.props.match.params.recipeId);
	}

	render() {
		let { recipe, classes, user } = this.props;
		console.log(this.props);
		return (
			<React.Fragment>
				<CssBaseline />
				<Container maxWidth="lg">
					<main>
						<MainHeading
							post={{
								title: recipe.data.name,
								description: recipe.data.description,
								image:
									"https://source.unsplash.com/x5SRhkFajrA/1920x1269",
							}}
							user_id={user.data.id}
							price={recipe.data.price}
						/>
						<Grid
							container
							spacing={5}
							className={classes.mainGrid}
						>
							<Main recipe={recipe.data} />
						</Grid>
					</main>

					<Typography
						variant="h3"
						align="center"
						style={{ marginTop: "100px", marginBottom: "50px" }}
						gutterBottom
					>
						Reviews
						<Divider />
					</Typography>

					<Grid container spacing={4}>
						{featuredPosts.map((post) => (
							<Reviews key={post.title} post={post} />
						))}
					</Grid>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		recipe: state.recipe,
	};
};

export default withStyles(styles, { withTheme: true })(
	connect(mapStateToProps, {
		fetchRecipeDetails,
	})(Recipe)
);
