import { GET_SALES } from '../actions/types';

const initialState = [];

console.log('reducers/month', initialState);

const getDataSales = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SALES:
			return payload;
		default:
			return state;
	}
};

export default getDataSales;
