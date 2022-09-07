import { GET_SALES_USERS } from '../actions/types';

const initialState = [];

// console.log('reducers/users', initialState);

const salesUsers = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SALES_USERS:
			return payload.sort((a, b) =>
				a.total > b.total ? -1 : b.total > a.total ? 1 : 0
			);
		default:
			return state;
	}
};

export default salesUsers;
