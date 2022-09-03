import { combineReducers } from 'redux';
import redColors from './colors';
import redData from './data';
import redErrorFilter from './errorFilter';
import redLoading from './loading';
import login from './login';
import redPage from './paginate';
import redUser from './user';
import salesData from './sales';

const reducer = combineReducers({
	redLoading,
	redData,
	redPage,
	redColors,
	login,
	redUser,
	redErrorFilter,
	salesData,
});

export default reducer;
