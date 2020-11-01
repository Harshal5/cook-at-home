import { combineReducers } from "redux";
import user from "./authReducer/authReducer";
import recipeList from "./recipeListReducer/recipeListReducer";
import recipe from "./recipeReducer/recipeReducer";
import stock from "./stockReducer/stockReducer";

const rootReducer = combineReducers({
	user,
	recipeList,
	recipe,
	stock,
});

export default rootReducer;
