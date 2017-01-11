/**
 * Created by Artem_Volkov on 06-Jan-17.
 */
import {FLIGHT_TICKETS} from './../../settings';
import {CHANGE_FLIGHT_TICKETS} from './../../actions/options';

export default function flights(state = FLIGHT_TICKETS, action) {
	if (action.type === CHANGE_FLIGHT_TICKETS) {
		return action.flights;
	}

	return state;
}
