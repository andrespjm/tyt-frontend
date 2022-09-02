import axios from 'axios';

import {
	GET_COLORS,
	GET_DATA,
	GET_FILTERED_DATA,
	GET_USER,
	GET_USERS,
	SET_LOADING,
	SET_LOGIN,
	SET_PAGE,
	ERROR_FILTERING_DATA,
	GET_USER_ORDER,
	GET_REVIEW,
} from './types';

export const setLoading = payload => ({ type: SET_LOADING, payload });

export const setPage = page => dispatch =>
	dispatch({ type: SET_PAGE, payload: page });

export const loggin = () => dispatch => dispatch({ type: SET_LOGIN });

// Get Products from backend
export const getData = () => {
	return async dispatch => {
		dispatch(setLoading(true));
		try {
			const response = await axios.get('/products');
			if (response.status === 200)
				dispatch({ type: GET_DATA, payload: response.data });
		} catch {
			dispatch({ type: GET_DATA, payload: null });
		}
		dispatch(setLoading(false));
	};
};

// Get filtered Products from backend
export const getFilteredData = query => {
	return async dispatch => {
		try {
			dispatch(setLoading(true));
			const response = await axios.get(`/products/${query}`);
			dispatch({ type: GET_FILTERED_DATA, payload: response.data });
			setPage(1);
		} catch (error) {
			dispatch(setErrorFilter(true));
			getData();
		}
		dispatch(setLoading(false));
	};
};

export const setErrorFilter = payload => ({
	type: ERROR_FILTERING_DATA,
	payload,
});

// Get Colors from backend
export const getColors = () => {
	return async dispatch => {
		dispatch(setLoading(true));
		const response = await axios.get('/colors');
		dispatch({ type: GET_COLORS, payload: response.data });
		dispatch(setLoading(false));
	};
};

// USERS
export const addUser = async user => {
	const res = await axios.post('/users/signup', user);
	return res.data;
};

export const updateUserP = async user => {
	const id = user.id;
	const res = await axios.put('/users/user/' + id, user);
	return res.data;
};

export const getUsers = () => {
	return async dispatch => {
		const json = await axios.get('/users');
		return dispatch({
			type: GET_USERS,
			payload: json.data,
		});
	};
};

// USER_ID
export const getUser = id => {
	return async dispatch => {
		const json = await axios.get(`/users/${id}`);
		return dispatch({
			type: GET_USER,
			payload: json.data,
		});
	};
};

export const getUserOrder = id => {
	return async dispatch => {
		const userOrder = (await axios.get(`/users/purchases/${id}`)).data;
		return dispatch({
			type: GET_USER_ORDER,
			payload: userOrder,
		});
	};
};

export const getRerview = id => {
	return async dispatch => {
		const json = await axios(`/review?productId=${id}`);
		return dispatch({
			type: GET_REVIEW,
			payload: json.data,
		});
	};
};
