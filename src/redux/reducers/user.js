import { GET_USER, GET_USERS } from '../actions/types';

const initialState = [];

export const redUser = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USERS:
			return payload;
		case GET_USER:
			return payload;
		default:
			return state;
	}
};

export default redUser;
