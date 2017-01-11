/**
 * Created by Artem_Volkov on 23-Dec-16.
 */
export default function searchTerm(state = '', action) {
	if (action.type === 'CHANGE_SEARCH_TERM') {
		return action.term;
	}

	return state;
}
