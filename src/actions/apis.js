/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import * as axios from 'axios';
import {EVENTS_API, API_KEY, FLIGHT_SEARCH_API, AIRPORT_LIST_API,
	EXPEDIA_API_KEY, HOTEL_SEARCH_API, CAR_RENTAL_API, GRAPH_QL_API} from './../settings';
import STORE from '../store/index';

export function getEvents(searchTerm = '') {
	const params = {
		keyword: searchTerm,
		apikey: API_KEY,
		size: STORE.getState().options.events
	};

	return axios.get(EVENTS_API, {params});
}

export function getAirportCodeByCity(name = 'Los Angeles') {
	let params = {
		query: `{cities(name: "${name}") {name airportCode latitude longitude}}`
	};
	return axios.get(GRAPH_QL_API, {params});
}

export function getFlightAir(departureDate, departureAirport, arrivalAirport) {
	const params = {
		departureAirport: departureAirport,
		arrivalAirport: arrivalAirport,
		departureDate: departureDate,
		maxOfferCount: STORE.getState().options.flights,
		apikey: EXPEDIA_API_KEY
	};
	
	return axios.get(FLIGHT_SEARCH_API, {params});
}

export function getHotelInfo(checkInDate, checkOutDate, city){
	const params = {
		city: city,
		checkInDate: checkInDate,
		checkOutDate: checkOutDate,
		room1: 2,
		resultsPerPage: STORE.getState().options.hotels,
		apikey: EXPEDIA_API_KEY
	};

	return axios.get(HOTEL_SEARCH_API, {params});
}

export function getCarRental(pickupdate, dropoffdate, arrivalAirport) {
	const params = {
		pickupdate: pickupdate,
		dropoffdate: dropoffdate,
		pickuplocation: arrivalAirport,
		dropofflocation: arrivalAirport,
		classes: 'economy',
		sort: 'price',
		limit: STORE.getState().options.cars,
		apikey: EXPEDIA_API_KEY
	};

	return axios.get(CAR_RENTAL_API, {params});
}