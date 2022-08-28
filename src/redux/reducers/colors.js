import { GET_COLORS } from '../actions/types';

export const redColors = (state = [], { type, payload }) => {
	switch (type) {
		case GET_COLORS:
			payload.sort((a, b) => (a.hex > b.hex ? 1 : b.hex > a.hex ? -1 : 0));
			return payload;
		default:
			return state;
	}
};

export default redColors;
