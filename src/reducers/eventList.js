/**
 * Created by Artem_Volkov on 23-Dec-16.
 */
export function eventList(state = [], action) {
	if (action.type === 'GET_EVENT_LIST') {
		return [...action.events]
	}

	return state;
}

export function eventsAltList(state = [], action) {
    if (action.type === 'GET_EVENT_ALT_LIST') {
        return [...action.events]
    }

    return state;
}