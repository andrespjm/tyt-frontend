import { GET_SALES_USERS } from '../actions/types';

const initialState = [];

// console.log('reducers/users', initialState);

const salesUsers = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SALES_USERS:
			return payload;
		default:
			return state;
	}
};

export default salesUsers;
