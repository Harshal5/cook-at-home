import { API } from "../../services/api";
import {
	GET_RECIPE_LIST_REQUEST,
	GET_RECIPE_LIST_SUCCESS,
	GET_RECIPE_LIST_FAILURE,
} from "./actionTypes";

export const getRecipeListRequest = () => {
	return {
		type: GET_RECIPE_LIST_REQUEST,
	};
};

export const getRecipeListSuccess = (recipes) => {
	return {
		type: GET_RECIPE_LIST_SUCCESS,
		recipes,
	};
};

export const getRecipeListFailure = (error) => {
	return {
		type: GET_RECIPE_LIST_FAILURE,
		error,
	};
};

export const fetchRecipeList = () => async (dispatch) => {
	try {
		dispatch(getRecipeListRequest());
		const res = await API.get("/recipes");
		dispatch(getRecipeListSuccess(res.data));
	} catch (err) {
		console.log(err.response);
		if (err.response)
			dispatch(getRecipeListFailure(err.response.data.error));
		else dispatch(getRecipeListFailure(err));
	}
};
