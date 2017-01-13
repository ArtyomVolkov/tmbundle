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

export function getTickets() {
	const params = {
		departureAirport: 'LAX',
		arrivalAirport: 'WAS',
		departureDate: '2017-01-29',
		maxOfferCount: STORE.getState().options.flights,
		apikey: EXPEDIA_API_KEY
	};
  fetch('http://terminal2.expedia.com/x/mflights/search?departureAirport=LAX&arrivalAirport=ORD&departureDate=2017-02-08&apikey=rxrUZKoPlSKZXN4PPZQfDgOK2dMRyG7Z')
		.then((data) => {
  		console.log(data);
		}).catch((error) => {
  		console.log('*****error*****');
  		console.log(error);
	});
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

export function getFlightAir() {
	const params = {
		departureAirport: 'LAX',
		arrivalAirport: 'WAS',
		departureDate: '2017-01-29',
		maxOfferCount: STORE.getState().options.flights,
		apikey: EXPEDIA_API_KEY
	};
	
	return axios.get(FLIGHT_SEARCH_API, {params});
}

export function getHotelInfo(){
	const params = {
		city: 'WASHINGTON',
		checkInDate: '2017-01-30',
		checkOutDate: '2017-02-04',
		room1: 2,
		resultsPerPage: STORE.getState().options.hotels,
		apikey: EXPEDIA_API_KEY
	};

	return axios.get(HOTEL_SEARCH_API, {params});
}

export function getCarRental() {
	const params = {
		pickupdate: '2017-01-29T19:30',
		dropoffdate: '2017-02-04T12:00',
		pickuplocation: 'IAD',
		dropofflocation: 'IAD',
		classes: 'economy',
		sort: 'price',
		limit: STORE.getState().options.cars,
		apikey: EXPEDIA_API_KEY
	};

	return axios.get(CAR_RENTAL_API, {params});
}