import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { configureStore } from "../redux";
import { localLogin } from "../redux/authReducer/authActions";
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
						<Route path="/auth" component={AuthPage}></Route>
					</div>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
