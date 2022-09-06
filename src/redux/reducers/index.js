import { combineReducers } from 'redux';
import redColors from './colors';
import redData from './data';
import redErrorFilter from './errorFilter';
import redLoading from './loading';
import login from './login';
import redUser from './user';
import redPurchases from './purchases';
import salesData from './sales';
import salesProducts from './salesByProducts';
import salesUsers from './salesByUsers';

const reducer = combineReducers({
	redLoading,
	redData,
	redColors,
	login,
	redUser,
	redErrorFilter,
	salesData,
	redPurchases,
	salesProducts,
	salesUsers,
});

export default reducer;
