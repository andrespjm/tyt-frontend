// import { GET_SALES_FILTER } from '../actions/types';

// const initialState = [];

// console.log('reducers/month', initialState);

// const filterSales = (state = initialState, { type, payload }) => {
// 	switch (type) {
// 		case GET_SALES_FILTER:
// 			const filter =
// 				payload === 'All'
// 					? initialState
// 					: initialState.filter(e =>
// 							new Date(e.date).getMonth()?.includes(payload.getMonth())
// 					  );
// 			return {
// 				filter,
// 			};

// 		default:
// 			return state;
// 	}
// };

// export default filterSales;
