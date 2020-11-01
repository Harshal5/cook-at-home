import React from "react";
import { connect } from "react-redux";
import RecipesPage from "./RecipesPage";
import HomePage from "./HomePage";

const AuthPage = (props) => {
	let { user } = props;
	if (user.loggedIn) {
		return <RecipesPage />;
	} else {
		return <HomePage />;
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(AuthPage);
