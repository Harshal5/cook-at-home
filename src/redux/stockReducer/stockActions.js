import { API } from "../../services/api";
import {
	STOCK_DETAILS_REQUEST,
	STOCK_DETAILS_SUCCESS,
	STOCK_DETAILS_FAILURE,
} from "./actionTypes";

export const stockDetailsRequest = () => {
	return {
		type: STOCK_DETAILS_REQUEST,
	};
};

export const stockDetailsSuccess = (stock) => {
	return {
		type: STOCK_DETAILS_SUCCESS,
		stock,
	};
};

export const stockDetailsFailure = (error) => {
	return {
		type: STOCK_DETAILS_FAILURE,
		error,
	};
};

export const fetchStockDetails = () => async (dispatch) => {
	try {
		dispatch(stockDetailsRequest());
		let res = await API.get(`/stocks`);
		dispatch(stockDetailsSuccess(res.data));
	} catch (err) {
		if (err.response)
			dispatch(stockDetailsFailure(err.response.data.error));
		else dispatch(stockDetailsFailure(err));
	}
};
