import { GET_SALES_PRODUCTS } from '../actions/types';

const initialState = [];

// console.log('reducers/products', initialState);

const salesProducts = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SALES_PRODUCTS:
			return payload.sort((a, b) =>
				a.total > b.total ? -1 : b.total > a.total ? 1 : 0
			);
		default:
			return state;
	}
};

export default salesProducts;
