import { combineReducers } from "redux";
import user from "./authReducer/authReducer";

const rootReducer = combineReducers({
	user,
});

export default rootReducer;
