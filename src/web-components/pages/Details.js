/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import React, {Component} from 'react';
import classNames from 'classnames';
import {hashHistory} from 'react-router';
// store
import STORE from '../../store/index';
// components
import Spinner from './../custom-components/spinner/Spinner';
import EventWidget from './../custom-components/widgets/EventWidget';
// Actions
import {getFlightAir, getHotelInfo, getCarRental} from '../../actions/apis';
// settings
import {RESULTS_LIMIT, IMAGES_TRVL, GOOGLE_MAPS} from './../../settings';
// styles
import * as STYLE from './../../styles/common.styl';
import * as style from './Details.styl';

class Details extends Component {
	constructor(props) {
		super(props);
		
		const state = STORE.getState();

		this.state = {
			event: state.eventDetails,
			activeSpinner: true,
			flight: null,
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
		return Promise.all([getFlightAir(), getHotelInfo(), getCarRental()]).then((responses) => {
			let flightData = responses[0].data;
			let hotelData = responses[1].data;
			let carRental = responses[2].data;

			this.setState({
				activeSpinner: false,
				flight: {
					offers: flightData['offers'][0],
					legs: flightData['legs'][0]
				},
				hotels: hotelData['hotelList'].splice(0, RESULTS_LIMIT),
				cars: carRental['CarInfoList']['CarInfo'].splice(0, RESULTS_LIMIT)
			});
		}).catch((error) => {
			console.error(error.message);
			this.setState({
				activeSpinner: false
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
		const {flight} = this.state;
		const details = flight.legs.segments[0];
		const offer = flight.offers;

		return (
			<div class={classNames(style['row'], STYLE['mrg-t-50'])}>
				<EventWidget title={'Flight Ticket'}>
					<div class={style['widget-details']}>
						<div class={style['widget-item']}>
							<div class={style['coll-l']}>
								<div class={style['item-row']}>
									<i class="fa fa-clock-o" aria-hidden="true" />
									<span>{details.departureTime + ' - ' + details.arrivalTime}</span>
								</div>
								<div class={style['item-row']}>
									<i class="fa fa-plane" aria-hidden="true" />
									<b>{`${details.departureAirportAddress.city} (${details.departureAirportCode})
								- ${details.arrivalAirportAddress.city} (${details.arrivalAirportCode})`}</b>
								</div>
								<div class={style['item-row']}>
									<div class={style['plane-details']}>
										<span class={STYLE['mrg-r-30']}>Flight Number:
											<span class={STYLE['value']}>{details.flightNumber}</span>
										</span>
										<span class={STYLE['mrg-r-30']}>Plane:
											<span class={STYLE['value']}>{details.equipmentDescription}</span>
										</span>
										<span class={STYLE['mrg-r-30']}>Duration:
											<span class={STYLE['value']}>{details.duration}</span>
										</span>
									</div>
								</div>
							</div>
							<div class={style['coll-r']}>
								<div class={style['item-row']}>
									<span class={style['price']}>{offer.totalFarePrice.formattedPrice}</span>
									<div class={STYLE['pd-t-25']}>
										<button class={STYLE['btn-primary']}
											onClick={this.buyTicket.bind(this, offer.detailsUrl)}>buy a ticket</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</EventWidget>
			</div>
		)
	}

	renderImage(width = 120, height = 120, url, alt) {
		return <img class={style['image-icon']} src={url} alt={alt} width={width} height={height} />
	}

	renderHotelDetails() {
		const {hotels} = this.state;

		return (
			<div class={style['row']}>
				<EventWidget title={'Hotel Reservation'}>
					<div class={style['widget-details']}>
						{
							hotels.map((hotel, index) => {
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
												{this.renderImage(120, 80, (IMAGES_TRVL + hotel.largeThumbnailUrl))}
											</div>
										</div>
										<div class={style['coll-r']}>
											<span class={style['price']}>
												{hotel.lowRateInfo.currencySymbol + hotel.lowRateInfo.strikethroughPriceToShowUsers}
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
		const {cars} = this.state;

		return (
			<div class={style['row']}>
				<EventWidget title={'Car Rental'}>
					<div class={style['widget-details']}>
						{
							cars.map((car, index) => {
								return (
									<div key={index} class={style['widget-item']}>
										<div class={style['coll-l']}>
											<div class={style['item-row']}>
												<i class="fa fa-car" aria-hidden="true" />
												<b>{car.SupplierName}</b>
											</div>
											<div style={{display: 'flex'}}>
												{this.renderImage(265, 160, (car.ThumbnailUrl.replace(/_t.jpg/, '_l.jpg')))}
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
		const {event, flight, hotels, cars, activeSpinner} = this.state;

		if (!event) {
			return false;
		}

		const images = event.images;
		const location = event['_embedded'] && event['_embedded'].venues[0];
		const date = event['dates'];

		return (
			<div>
				{activeSpinner && <Spinner />}
				{!activeSpinner && <div>
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
						{flight && this.renderFlightDetails()}
						{hotels && this.renderHotelDetails()}
						{cars && this.renderCarDetails()}
					</div>
				</div>
				}
			</div>
		)
	}
}

export default Details;