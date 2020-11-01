import { combineReducers } from "redux";
import user from "./authReducer/authReducer";
import recipeList from "./recipeListReducer/recipeListReducer";
import recipe from "./recipeReducer/recipeReducer";

const rootReducer = combineReducers({
	user,
	recipeList,
	recipe,
});

export default rootReducer;
