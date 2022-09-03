import { DELETE_FAVOURITE, GET_USER, GET_USERS, GET_USER_FAVOURITES, GET_USER_ORDER } from '../actions/types';

const initialState = [];

export const redUser = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USERS:
			return payload;
		case GET_USER:
			return payload;
		case GET_USER_ORDER:
			return payload;
		case GET_USER_FAVOURITES:
			return payload;
		case DELETE_FAVOURITE:
			return state;
		default:
			return state;
	}
};

export default redUser;
