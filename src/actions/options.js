/**
 * Created by Artem_Volkov on 06-Jan-17.
 */
// store
import STORE from '../store/index';
// Action Types
export const SET_USER_CITY = 'SET_USER_CITY';
export const CHANGE_EVENT_ITEMS = 'CHANGE_EVENT_ITEMS';
export const CHANGE_FLIGHT_TICKETS = 'CHANGE_FLIGHT_TICKETS';
export const CHANGE_HOTEL_RESULTS = 'CHANGE_HOTEL_RESULTS';
export const CHANGE_CAR_RESULTS = 'CHANGE_CAR_RESULTS';

export function changeSearchOptions(key, value) {
	switch (key) {
		case 'events':
			setEventResults(value);
			break;
		case 'flights':
			setFlightResults(value);
			break;
		case 'hotels':
			setHotelResults(value);
			break;
		case 'cars':
			setCarResults(value);
			break;
		default: break;
	}
}

// private actions
function setEventResults(value) {
	STORE.dispatch({type: CHANGE_EVENT_ITEMS, events: value});
}

function setFlightResults(value) {
	STORE.dispatch({type: CHANGE_FLIGHT_TICKETS, flights: value});
}

function setHotelResults(value) {
	STORE.dispatch({type: CHANGE_HOTEL_RESULTS, hotels: value});
}

function setCarResults(value) {
	STORE.dispatch({type: CHANGE_CAR_RESULTS, cars: value});
}