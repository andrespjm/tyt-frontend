import { GET_SALES_PRODUCTS } from '../actions/types';

const initialState = [];

// console.log('reducers/products', initialState);

const salesProducts = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SALES_PRODUCTS:
			return payload;
		default:
			return state;
	}
};

export default salesProducts;
