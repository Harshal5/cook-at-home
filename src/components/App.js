import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { configureStore } from "../redux";
import { localLogin } from "../redux/authReducer/authActions";
import HomePage from "./Home";
import RecipePage from "./Recipe";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "./auth";

const store = configureStore();
localLogin(store);

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<div className="page-contents">
						<Route exact path="/" component={HomePage}></Route>
						<Route
							exact
							path="/recipes/:recipeId"
							component={RecipePage}
						></Route>
						<Route path="/auth" component={AuthPage}></Route>
					</div>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
