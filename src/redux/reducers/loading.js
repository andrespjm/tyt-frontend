import { SET_LOADING } from '../actions/types';

const redLoading = (state = false, { type, payload }) => {
	switch (type) {
		case SET_LOADING:
			return payload;
		default:
			return state;
	}
};

export default redLoading;
