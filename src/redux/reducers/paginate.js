import { SET_PAGE } from '../actions/types';

export default function redPage(state = 1, { type, payload }) {
	switch (type) {
		case SET_PAGE:
			return payload;
		default:
			return state;
	}
}
