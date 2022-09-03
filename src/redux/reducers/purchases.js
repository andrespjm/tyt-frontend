import { GET_PURCHASES } from '../actions/types';

const redPurchases = (state = [], { type, payload }) => {
	switch (type) {
		case GET_PURCHASES:
			return payload;
		default:
			return state;
	}
};

export default redPurchases;
