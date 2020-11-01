import {
	RECIPE_DETAILS_REQUEST,
	RECIPE_DETAILS_SUCCESS,
	RECIPE_DETAILS_FAILURE,
} from "./actionTypes";

const initialState = {
	loading: false,
	loaded: false,
	data: {},
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case RECIPE_DETAILS_REQUEST:
			return { ...state, loading: true, loaded: false };
		case RECIPE_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.recipe,
				error: null,
			};
		case RECIPE_DETAILS_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
};
