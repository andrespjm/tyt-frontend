import { GET_SALES } from '../actions/types';

const initialState = [];

const salesData = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SALES:
			return payload.sort((a, b) =>
				a.orderId > b.orderId ? 1 : b.orderId > a.orderId ? -1 : 0
			);
		default:
			return state;
	}
};

export default salesData;
