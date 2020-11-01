import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { fetchRecipeList } from "../../redux/recipeListReducer/recipeListActions";
import { connect } from "react-redux";
import { CardActionArea } from "@material-ui/core";

const styles = (theme) => ({
	lineClamp: {
		display: "-webkit-box",
		"-webkit-line-clamp": 3,
		"-webkit-box-orient": "vertical",
		overflow: "hidden",
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	cardMedia: {
		paddingTop: "56.25%", // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

class RecipeList extends React.Component {
	componentDidMount() {
		this.props.fetchRecipeList();
	}
	render() {
		const { classes, recipeList } = this.props;
		return (
			<React.Fragment>
				<CssBaseline />
				<main>
					<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{recipeList.data.length > 0 &&
								recipeList.data.map((recipe) => (
									<Grid
										item
										key={recipe.recipe_id}
										xs={12}
										sm={6}
										md={4}
									>
										<CardActionArea
											component={Link}
											to={`/recipes/${recipe.recipe_id}`}
										>
											<Card className={classes.card}>
												<CardMedia
													className={
														classes.cardMedia
													}
													image="https://source.unsplash.com/98Xi5vMGKck/640x426"
													title="Image title"
												/>
												<CardContent
													className={
														classes.cardContent
													}
												>
													<Typography
														gutterBottom
														variant="h5"
														component="h2"
													>
														{recipe.name}
													</Typography>
													<Typography
														className={
															classes.lineClamp
														}
													>
														{recipe.description}
													</Typography>
												</CardContent>
												<CardActions>
													<Grid
														container
														justify="center"
													>
														<Button
															size="small"
															color="primary"
														>
															View
														</Button>
													</Grid>
												</CardActions>
											</Card>
										</CardActionArea>
									</Grid>
								))}
						</Grid>
					</Container>
				</main>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		recipeList: state.recipeList,
	};
};

export default withStyles(styles, { withTheme: true })(
	withRouter(
		connect(mapStateToProps, {
			fetchRecipeList,
		})(RecipeList)
	)
);
