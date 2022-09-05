import { GET_DATA, GET_FILTERED_DATA } from '../actions/types';

const initialState = [];

const redData = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_DATA:
			payload.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
			return payload;
		case GET_FILTERED_DATA:
			return payload;
		default:
			return state;
	}
};

export default redData;
