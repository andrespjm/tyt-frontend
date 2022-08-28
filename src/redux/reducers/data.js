import { GET_DATA, GET_FILTERED_DATA } from '../actions/types';

const initialState = [];

const redData = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_DATA:
			return payload;
		case GET_FILTERED_DATA:
			return payload;
		default:
			return state;
	}
};

export default redData;
