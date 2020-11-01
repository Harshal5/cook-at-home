import {
	GET_RECIPE_LIST_REQUEST,
	GET_RECIPE_LIST_SUCCESS,
	GET_RECIPE_LIST_FAILURE,
} from "./actionTypes";

const initialState = {
	loading: false,
	loaded: false,
	data: [],
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_RECIPE_LIST_REQUEST:
			return { ...state, loading: true, loaded: false };
		case GET_RECIPE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.recipes,
				error: null,
			};
		case GET_RECIPE_LIST_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
};
