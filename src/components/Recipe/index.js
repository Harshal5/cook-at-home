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

class Recipe extends React.Component {
	componentDidMount() {
		this.props.fetchRecipeDetails(this.props.match.params.recipeId);
	}

	render() {
		let { recipe, classes } = this.props;
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
						/>
						<Grid
							container
							spacing={5}
							className={classes.mainGrid}
						>
							<Main recipe={recipe.data} />
						</Grid>
					</main>
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
