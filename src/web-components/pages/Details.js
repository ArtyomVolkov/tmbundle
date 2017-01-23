/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import React, {Component} from 'react';
import classNames from 'classnames';
import {hashHistory} from 'react-router';
import moment from 'moment';
// store
import STORE from '../../store/index';
// components
import Spinner from './../custom-components/spinner/Spinner';
import EventWidget from './../custom-components/widgets/EventWidget';
import Image from './../custom-components/Image/Image';
// Actions
import {getFlightAir, getHotelInfo, getCarRental, getAirportCodeByCity} from '../../actions/apis';
// settings
import {RESULTS_LIMIT, IMAGES_TRVL, GOOGLE_MAPS, TRIP_DAYS, DATE_SEARCH_FORMAT} from './../../settings';
import {readData} from './../../utils/common';
// styles
import * as STYLE from './../../styles/common.styl';
import * as style from './Details.styl';

class Details extends Component {
	constructor(props) {
		super(props);
		
		const state = STORE.getState();
		this.state = {
			event: state.eventDetails,
			spinners: {
				flight: true,
				hotel: true,
				car: true
			},
			errors: {
				flight: null,
				hotel: null,
				car: null
			},
			userCity: state.options.userCity,
			flights: null,
			hotels: null,
			cars: null
		};

		if (state.eventDetails) {
			this.getTravelData();
		}
	}

	componentDidMount() {
		if (!this.state.event) {
			hashHistory.push('search');
		}
	}

	getTravelData =()=> {
		const {event, userCity} = this.state;
		const eventDate = event.dates.start.localDate;
		const startDate = moment(eventDate).format(DATE_SEARCH_FORMAT);
		const endDate = moment(+moment(eventDate) + (TRIP_DAYS * 24*60*60*1000)).format(DATE_SEARCH_FORMAT);

		getAirportCodeByCity(event['_embedded'].venues[0].city.name).then((response) => {
			let arrivalCity = {
				name: readData(response.data, 'data.cities.0.name').value || 'WASHINGTON',
				airportCode: readData(response.data, 'data.cities.0.airportCode').value || 'WAS'
			};
			this.fetchTravelData(startDate, endDate, userCity.airportCode, arrivalCity);
		});
	};

	fetchTravelData =(startDate, endDate, departureAirport, arrivalCity) => {
		const {spinners, errors} = this.state;

		getFlightAir(startDate, departureAirport, arrivalCity.airportCode).then((response) => {
			let flightData = response.data;
			let flightErrors = response.data.errors;

			spinners.flight = false;
			if (flightErrors) {
				errors.flight = flightErrors[0].errorInfo.summary;
				this.setState({
					spinners: spinners,
					errors: errors
				});
				return;
			}

			this.setState({
				spinners: spinners,
				flights: {
					offers: flightData['offers'],
					legs: flightData['legs']
				}
			});
		}).catch(() => {
			spinners.flight = false;
			this.setState({
				spinners: spinners
			});
		});

		getHotelInfo(startDate, endDate, arrivalCity.name).then((response) => {
			let hotelData = response.data;
			let availableHotelCount = response.data.availableHotelCount;
			spinners.hotel = false;

			if (!availableHotelCount) {
				errors.hotel = 'No available hotels for such date';
				this.setState({
					spinners: spinners,
					errors: errors
				});
				return;
			}

			this.setState({
				spinners: spinners,
				hotels: hotelData['hotelList'].splice(0, RESULTS_LIMIT)
			});
		}).catch(() => {
			spinners.hotel = false;
			this.setState({
				spinners: spinners
			});
		});

		getCarRental(startDate, endDate, departureAirport, arrivalCity.airportCode).then((response) => {
			spinners.car = false;
			this.setState({
				spinners: spinners,
				cars: response.data['CarInfoList']['CarInfo'].splice(0, RESULTS_LIMIT)
			});
		}).catch((error) => {
			spinners.car = false;
			errors.car = error.response.data && error.response.data.Details || 'No available cars';
			this.setState({
				spinners: spinners,
				errors: errors
			});
		});
	};

	goToMapDetails(country, city, street) {
		let query= '';

		if (country) {
			query += country;
		}

		if (city) {
			query += city;
		}

		if (street) {
			query += street;
		}

		window.open(GOOGLE_MAPS + query, '_blank');
	}

	buyTicket(url) {
		window.open(url, '_blank');
	}

	renderFlightDetails() {
		const {flights, spinners, errors} = this.state;

		return (
			<div class={classNames(style['row'], STYLE['mrg-t-50'])}>
				<EventWidget title={'Flight Ticket'}>
					{spinners.flight && <Spinner />}
					{errors.flight && <span class={STYLE['error-msg']}>{errors.flight}</span>}
					<div class={style['widget-details']}>
						{flights && flights.legs.map((detail, index) => {
							return (
								<div class={style['widget-item']}>
									<div class={style['coll-l']}>
										<div class={style['item-row']}>
											<i class="fa fa-clock-o" aria-hidden="true"/>
											<span>{detail.segments[0].departureTime + ' - ' + detail.segments[0].arrivalTime}</span>
										</div>
										<div class={style['item-row']}>
											<i class="fa fa-plane" aria-hidden="true"/>
											<b>{`${detail.segments[0].departureAirportAddress.city} (${detail.segments[0].departureAirportCode})
										- ${detail.segments[0].arrivalAirportAddress.city} (${detail.segments[0].arrivalAirportCode})`}
											</b>
										</div>
										<div class={style['item-row']}>
											<div class={style['plane-details']}>
												<span class={STYLE['mrg-r-30']}>Flight Number:
													<span class={STYLE['value']}>{detail.segments[0].flightNumber}</span>
												</span>
												<span class={STYLE['mrg-r-30']}>Plane:
													<span class={STYLE['value']}>{detail.segments[0].equipmentDescription}</span>
												</span>
												<span class={STYLE['mrg-r-30']}>Duration:
													<span class={STYLE['value']}>{detail.segments[0].duration}</span>
												</span>
											</div>
										</div>
									</div>
									<div class={style['coll-r']}>
										<div class={style['item-row']}>
											<span class={style['price']}>{flights.offers[index].totalFarePrice.formattedPrice}</span>
											<div class={STYLE['pd-t-25']}>
												<button class={STYLE['btn-primary']}
													onClick={this.buyTicket.bind(this, flights.offers[index].detailsUrl)}>buy a ticket
												</button>
											</div>
										</div>
									</div>
								</div>)
						})}
					</div>
				</EventWidget>
			</div>
		)
	}

	renderHotelDetails() {
		const {hotels, spinners, errors} = this.state;

		return (
			<div class={style['row']}>
				<EventWidget title={'Hotel Reservation'}>
					{spinners.hotel && <Spinner />}
					{errors.hotel && <span class={STYLE['error-msg']}>{errors.hotel}</span>}
					<div class={style['widget-details']}>
						{
							hotels && hotels.map((hotel, index) => {
								return (
									<div key={index} class={style['widget-item']}>
										<div class={style['coll-l']}>
											<div class={style['item-row']}>
												<i class="fa fa-home" aria-hidden="true" />
												<b>{hotel.name}</b>
												{this.renderRate(+hotel.hotelGuestRating)}
											</div>
											<div class={style['item-row']}>
												<div class={style['location']}
														 onClick={this.goToMapDetails.bind(this, hotel.city, hotel.address)}>
													<i class="fa fa-map-marker" aria-hidden="true" />
													<span>{hotel.city + ', ' + hotel.address}</span>
												</div>
											</div>
											<div class={style['item-row']}>
												<span class={style['description']}>{hotel.shortDescription}</span>
											</div>
											<div class={style['item-row']}>
												<Image width={255} height={144}
													urls={[(IMAGES_TRVL + hotel.largeThumbnailUrl).replace(/_d.jpg/, '_l.jpg')]} />
											</div>
										</div>
										<div class={style['coll-r']}>
											<span class={style['price']}>
												${hotel.lowRateInfo.strikethroughPriceToShowUsers}
											</span>
											<div>
												<span class={style['period']}>(avg/night)</span>
												{hotel.shortDiscountMessage &&
												<span class={style['discount']}>{hotel.shortDiscountMessage}</span>}
											</div>
											<div class={STYLE['pd-t-25']}>
												<button class={STYLE['btn-reserve']}
													onClick={this.buyTicket.bind(this, '')}>reserve</button>
											</div>
										</div>
									</div>
								);
							})
						}
					</div>
				</EventWidget>
			</div>
		)
	}

	renderCarDetails() {
		const {cars, spinners, errors} = this.state;

		return (
			<div class={style['row']}>
				<EventWidget title={'Car Rental'}>
					{spinners.car && <Spinner />}
					{errors.car && <span class={STYLE['error-msg']}>{errors.car}</span>}
					<div class={style['widget-details']}>
						{
							cars && cars.map((car, index) => {
								return (
									<div key={index} class={style['widget-item']}>
										<div class={style['coll-l']}>
											<div class={style['item-row']}>
												<i class="fa fa-car" aria-hidden="true" />
												<b>{car.SupplierName}</b>
											</div>
											<div style={{display: 'flex'}}>
												<Image width={265} height={160}
													urls={[car.ThumbnailUrl.replace(/_t.jpg/, '_l.jpg'), car.ThumbnailUrl.replace(/_t.jpg/, '_b.jpg')]} />
												<div class={style['car-info']}>
													<div class={style['item-row']}>
														<span class={style['title']}>{car.CarMakeModel} ({car.CarClass})</span>
													</div>
													<div class={style['item-row']}>
														<span>{car.Capacity.AdultCount}</span>
														<span> doors: {`${car.CarDoorCount.Min}/${car.CarDoorCount.Max} `}</span>
														<span>{' A/C'}</span>
													</div>
													<div class={style['item-row']}>
														<span>{car.TransmissionDriveCode === '1' ? 'Automatic transmission' : 'Manual transmission'}</span>
													</div>
													<div class={style['item-row']}>
														<div class={style['car-details']}>
															<span>Pick Up: <span class={STYLE['value']}>{car.PickupInfo.DateTime}</span></span>
															<span> Drop Off: <span class={STYLE['value']}>{car.DropOffInfo.DateTime}</span></span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class={style['coll-r']}>
											<span class={style['price']}>${car.Price.BaseRate.Value}</span>
											<div>
												<span class={style['period']}>(per week)</span>
											</div>
											<div class={STYLE['pd-t-25']}>
												<button class={STYLE['btn-reserve']}
													onClick={this.buyTicket.bind(this, car.DetailsUrl)}>reserve</button>
											</div>
										</div>
									</div>
								);
							})
						}
					</div>
				</EventWidget>
			</div>
		)
	}

	renderRate(stars) {
		let starIcons = [];

		for (let i = 1; i <= 5; i++) {
			if (i < stars) {
				starIcons.push(<i key={i} class="fa fa-star" aria-hidden="true"/>);
				continue;
			}
			if (i - stars <= 0.5) {
				starIcons.push(<i key={i} class="fa fa-star-half-o" aria-hidden="true" />);
				continue;
			}
			starIcons.push(<i key={i} class="fa fa-star-o" aria-hidden="true" />);
		}

		return (
			<div class={style['rate']}>
				{
					starIcons.map((icon) => {
						return icon;
					})
				}
			</div>
		);
	}

	render() {
		const {event} = this.state;

		if (!event) {
			return false;
		}

		const images = event.images;
		const location = event['_embedded'] && event['_embedded'].venues[0];
		const date = event['dates'];

		return (
			<div>
				{<div>
					<div class={STYLE['app-title']}>
						<span>TKM ORDER PACKAGING</span>
					</div>
					<a class={STYLE['link']} href="#">Back to all events</a>
					<div class={style['details-content']}>
						<div class={style['row']}>
							<div class={classNames(style['coll'], STYLE['mrg-r-30'])}>
								<div class={style['event-title']}>{event.name}</div>
								<div class={style['dates-location']}>
									<div class={style['date']}>
										<i class="fa fa-clock-o" aria-hidden="true" />
										<b>{date.start.localDate + ' ' + date.start.localTime}</b>
									</div>
									<div class={style['location']}
										onClick={this.goToMapDetails.bind(this, location.country.name, location.city.name, location.address.line1)}>
										<i class="fa fa-map-marker" aria-hidden="true" />
										<span>{location.country.name + ', ' + location.city.name + ' | ' + location.address.line1}</span>
									</div>
								</div>
								<div class={style['description']}>
									{event.info || event.pleaseNote|| 'No description of event'}
								</div>
							</div>
							<div class={style['coll']}>
								{images && <div class={style['image']}>
									<img src={images[0].url} alt={event.name} width="555"/>
								</div>}
							</div>
						</div>
						{this.renderFlightDetails()}
						{this.renderHotelDetails()}
						{this.renderCarDetails()}
					</div>
				</div>
				}
			</div>
		)
	}
}

export default Details;