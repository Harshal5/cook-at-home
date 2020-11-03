import {
	STOCK_DETAILS_REQUEST,
	STOCK_DETAILS_SUCCESS,
	STOCK_DETAILS_FAILURE,
	GET_ORDER_DETAILS_REQUEST,
	GET_ORDER_DETAILS_SUCCESS,
	GET_ORDER_DETAILS_FAILURE,
} from "./actionTypes";

const initialState = {
	loading: false,
	loaded: false,
	data: {
		stock: [],
		orders: [],
	},
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case STOCK_DETAILS_REQUEST:
			return { ...state, loading: true, loaded: false };
		case GET_ORDER_DETAILS_REQUEST:
			return { ...state, loading: true, loaded: false };
		case STOCK_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: { ...state.data, stock: action.stock },
				error: null,
			};
		case GET_ORDER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: { ...state.data, orders: action.orders },
				error: null,
			};
		case STOCK_DETAILS_FAILURE:
			return { ...state, error: action.error };
		case GET_ORDER_DETAILS_FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
};
