/**
 * Created by Artem_Volkov on 23-Dec-16.
 */
export default function eventDetails(state = null, action) {
	if (action.type === 'SET_EVENT_DETAILS') {
		return action.eventDetails;
	}
	return state;
}