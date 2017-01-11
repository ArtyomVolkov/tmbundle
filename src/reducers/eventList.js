/**
 * Created by Artem_Volkov on 23-Dec-16.
 */
export default function eventList(state = [], action) {
	if (action.type === 'GET_EVENT_LIST') {
		return [...action.items]
	}

	return state;
}