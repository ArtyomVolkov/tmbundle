/**
 * Created by Artem_Volkov on 06-Jan-17.
 */
import {CHANGE_EVENT_ITEMS} from './../../actions/options';

import {EVENTS_COUNT} from '../../settings';

export default function events(state = EVENTS_COUNT, action) {
	if (action.type === CHANGE_EVENT_ITEMS) {
		return action.events;
	}

	return state;
}
