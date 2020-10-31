import axios from "axios";

const baseUrl = "http://localhost:5000/api";

export const API = axios.create({
	baseURL: baseUrl,
});

export const setHeaderToken = (token) => {
	console.log("setting header token");
	if (token) {
		API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common["Authorization"];
	}
};

API.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		return new Promise((resolve, reject) => {
			console.log(err);
			const originalReq = err.config;
			const refreshToken = localStorage.getItem("refreshToken");
			if (
				refreshToken &&
				err.response.status === 401 &&
				// err.response.data.error === 'Please Log In First' &&
				!err.config._retry
			) {
				originalReq._retry = true;

				let res = axios
					.post(`${baseUrl}/auth/refreshToken`, { refreshToken })
					.then((res) => {
						console.log(res.data);
						localStorage.setItem(
							"accessToken",
							res.data.accessToken
						);
						setHeaderToken(res.data.accessToken);
						return API(originalReq);
					});
				resolve(res);
			}
			return Promise.reject(err);
		});
	}
);
