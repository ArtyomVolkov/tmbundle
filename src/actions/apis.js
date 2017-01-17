/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import * as axios from 'axios';
import {EVENTS_API, API_KEY, FLIGHT_SEARCH_API, AIRPORT_LIST_API,
	EXPEDIA_API_KEY, HOTEL_SEARCH_API, CAR_RENTAL_API} from './../settings';
import STORE from '../store/index';

export function getEvents(searchTerm = '') {
	const params = {
		keyword: searchTerm,
		apikey: API_KEY,
		size: STORE.getState().options.events
	};

	return axios.get(EVENTS_API, {params});
}

function getAirport(city = 'Toronto', country = 'Canada', countryCode = 'CA') {
	const params = {
		city: city,
		country: country,
		countryCode: countryCode
	};

	return axios.post(AIRPORT_LIST_API, {
		//headers: {'Access-Control-Allow-Origin': '*'},
		withCredentials: true,
		data: params
	});
}

export function getFlightAir(departureDate = '2017-03-01') {
	const params = {
		departureAirport: 'LAX',
		arrivalAirport: 'WAS',
		departureDate: departureDate,
		maxOfferCount: STORE.getState().options.flights,
		apikey: EXPEDIA_API_KEY
	};
	
	return axios.get(FLIGHT_SEARCH_API, {params});
}

export function getHotelInfo(checkInDate, checkOutDate){
	const params = {
		city: 'WASHINGTON',
		checkInDate: checkInDate,
		checkOutDate: checkOutDate,
		room1: 2,
		resultsPerPage: STORE.getState().options.hotels,
		apikey: EXPEDIA_API_KEY
	};

	return axios.get(HOTEL_SEARCH_API, {params});
}

export function getCarRental(pickupdate, dropoffdate) {
	const params = {
		pickupdate: pickupdate,
		dropoffdate: dropoffdate,
		pickuplocation: 'IAD',
		dropofflocation: 'IAD',
		classes: 'economy',
		sort: 'price',
		limit: STORE.getState().options.cars,
		apikey: EXPEDIA_API_KEY
	};

	return axios.get(CAR_RENTAL_API, {params});
}