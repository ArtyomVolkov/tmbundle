/**
 * Created by Artem_Volkov on 06-Jan-17.
 */
import {HOTEL_RESULTS} from './../../settings';
import {CHANGE_HOTEL_RESULTS} from './../../actions/options';

export default function hotels(state = HOTEL_RESULTS, action) {
	if (action.type === CHANGE_HOTEL_RESULTS) {
		return action.hotels;
	}

	return state;
}