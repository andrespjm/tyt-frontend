import { GET_SALES } from '../actions/types';

const initialState = [];

const salesData = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SALES:
			return payload;
		default:
			return state;
	}
};

export default salesData;
