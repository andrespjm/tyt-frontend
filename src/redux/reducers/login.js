import { SET_LOGIN } from '../actions/types';

const initialState = {
	login: false,
};

const login = (state = initialState, { type }) => {
	switch (type) {
		case SET_LOGIN:
			return { ...state, login: !state.login };
		default:
			return state;
	}
};

export default login;
