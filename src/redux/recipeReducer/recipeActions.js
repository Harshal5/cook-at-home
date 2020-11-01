import { API } from "../../services/api";
import {
	RECIPE_DETAILS_REQUEST,
	RECIPE_DETAILS_SUCCESS,
	RECIPE_DETAILS_FAILURE,
} from "./actionTypes";

export const recipeDetailsRequest = () => {
	return {
		type: RECIPE_DETAILS_REQUEST,
	};
};

export const recipeDetailsSuccess = (recipe) => {
	return {
		type: RECIPE_DETAILS_SUCCESS,
		recipe,
	};
};

export const recipeDetailsFailure = (error) => {
	return {
		type: RECIPE_DETAILS_FAILURE,
		error,
	};
};

export const fetchRecipeDetails = (recipeId) => async (dispatch) => {
	try {
		dispatch(recipeDetailsRequest());
		let res = await API.get(`/recipes/${recipeId}`);
		dispatch(recipeDetailsSuccess(res.data));
	} catch (err) {
		if (err.response)
			dispatch(recipeDetailsFailure(err.response.data.error));
		else dispatch(recipeDetailsFailure(err));
	}
};
