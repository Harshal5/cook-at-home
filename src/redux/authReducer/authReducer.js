import {
	AUTH_REQUEST,
	AUTH_SUCCESS,
	LOGOUT,
	AUTH_FAILURE,
} from "./actionTypes";

const initialState = {
	loading: false,
	loggedIn: false,
	// userType: localStorage.getItem('userType') || null,
	data: null,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH_REQUEST:
			return { ...state, loading: true };
		case AUTH_SUCCESS:
			return {
				loading: false,
				loggedIn: !!Object.keys(action.user),
				data: action.user,
				error: null,
			};
		case AUTH_FAILURE:
			return { ...state, error: action.error };
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
