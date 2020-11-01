import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { ListItemIcon, ListItemText } from "@material-ui/core";

export default function Main(props) {
	const { recipe } = props;
	let num = 1;
	return (
		<Grid container justify="center">
			
			<Grid item xs={12} md={8}>

			<Typography variant="h3" align="center" gutterBottom>
				Instructions
			</Typography>
			<Divider />
			<br/>
			<Typography align="right"><b>Prep Time:</b> <b>{recipe.prep_time} mins</b></Typography>
		
			{/* {JSON.stringify(recipe)} */}
			<List>
				{recipe.instructions &&
					recipe.instructions.split("\r\n\r\n").map((step) => (
						<ListItem>
							<ListItemIcon>
								Step {num++}
								{/* <Typography>Step {num++}</Typography> */}
							</ListItemIcon>
							<ListItemText>
								{step}
								{/* <Typography>{step}</Typography> */}
							</ListItemText>
						</ListItem>
					))}
			</List>
			</Grid>
	
		</Grid>
	);
}

Main.propTypes = {
	posts: PropTypes.array,
	title: PropTypes.string,
};
