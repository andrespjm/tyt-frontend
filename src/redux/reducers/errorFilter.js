import { ERROR_FILTERING_DATA } from '../actions/types';

const redErrorFilter = (state = false, { type, payload }) => {
	switch (type) {
		case ERROR_FILTERING_DATA:
			return payload;
		default:
			return state;
	}
};

export default redErrorFilter;
