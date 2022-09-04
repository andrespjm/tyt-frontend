import { combineReducers } from 'redux';
import redColors from './colors';
import redData from './data';
import redErrorFilter from './errorFilter';
import redLoading from './loading';
import login from './login';
import redUser from './user';
import salesData from './sales';
import redPurchases from './purchases';

const reducer = combineReducers({
	redLoading,
	redData,
	redColors,
	login,
	redUser,
	redErrorFilter,
	salesData,
	redPurchases,
});

export default reducer;
