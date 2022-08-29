import { combineReducers } from 'redux';
import redColors from './colors';
import redData from './data';
import redErrorFilter from './errorFilter';
import redLoading from './loading';
import login from './login';
import redPage from './paginate';
import redUser from './user';

const reducer = combineReducers({
	redLoading,
	redData,
	redPage,
	redColors,
	login,
	redUser,
	redErrorFilter,
});

export default reducer;
