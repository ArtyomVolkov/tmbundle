import {SET_USER_CITY} from './../../actions/options';

export default function userCity(state = null, action) {
	if (action.type === SET_USER_CITY) {
		return action.userCity;
	}

	return state;
}
