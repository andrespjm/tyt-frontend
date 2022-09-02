import { GET_USER_BY_EMAIL } from '../actions/types';

const initialState = [];

export const authPostgres = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USER_BY_EMAIL:
			return payload;

		default:
			return state;
	}
};

export default authPostgres;
