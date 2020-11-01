import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { configureStore } from "../redux";
import { localLogin } from "../redux/authReducer/authActions";
import HomePage from "./Home";
import RecipePage from "./Recipe";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "./auth";
import Navbar from "./Navbar";
import Dashboard from "./dashboard/Dashboard";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
	typography: {
	  fontFamily: [
		'Montserrat',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif'
	  ].join(','),
	}
  });

const store = configureStore();
localLogin(store);

const App = () => {
	return (
		<ThemeProvider theme={theme} >
			<Provider store={store}>
				<Navbar/>
				<Router>
					<div className="App">
						<div className="page-contents">
							<Route exact path="/" component={HomePage}></Route>
							<Route
								exact
								path="/recipes/:recipeId"
								component={RecipePage}
							></Route>
							<Route
							exact
							path="/admin"
							component={Dashboard}
						></Route>
							<Route path="/auth" component={AuthPage}></Route>
						</div>
					</div>
				</Router>
			</Provider>
		</ThemeProvider>
	);
};

export default App;
