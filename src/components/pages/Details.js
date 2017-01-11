/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
// components
import EventWidget from './../widgets/EventWidget';
// Actions
import {getFlightAir, getHotelInfo, getCarRental} from '../../actions/apis';
import STORE from './../../store/index';
// settings
import {IMAGES_TRVL, N_A} from './../../settings';
// utilities
import {readData} from './../../utils/common';
// styles
import COMMON from './../../mobileStyles/common';
const style = StyleSheet.create({
	content: {
		marginTop: 55
	},
	title: {
		textAlign: 'center',
		fontSize: 18,
		color: 'black',
		fontWeight: 'bold',
		marginTop: 10
	},
	itemRow: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemTitle: {
		fontSize: 14,
		alignSelf: 'stretch',
		color: 'black',
		fontWeight: 'bold'
	},
	image: {
		width: 60,
		height: 60,
		marginRight: 5,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 3
	},
	dateTime: {
		fontSize: 12,
		fontWeight: 'bold'
	},
	subTitle: {
		fontSize: 12,
		color: 'gray',
		fontWeight: 'bold'
	},
	description: {
		fontSize: 14
	},
	eventTitleRow: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: 14,
		marginRight: 10
	},
	colL: {
		flex: 0.35
	},
	colR: {
		flex: 0.65
	}
});

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

	getTravelData() {
		return Promise.all([getFlightAir(), getHotelInfo(), getCarRental()]).then((responses) => {
			let flightData = responses[0].data;
			let hotelData = responses[1].data;
			let carRental = responses[2].data;

			this.setState({
				activeSpinner: false,
				flight: {
					offers: flightData['offers'],
					legs: flightData['legs']
				},
				hotels: hotelData['hotelList'],
				cars: (carRental['CarInfoList']['CarInfo']) instanceof Array
					? carRental['CarInfoList']['CarInfo'] : [carRental['CarInfoList']['CarInfo']]
			});
		}).catch((error) => {
			Alert.alert('Error', (error.message || 'Internal server error'));
			this.setState({
				activeSpinner: false
			});
		});
	}

	renderImage(style = {}, url) {
		return <Image style={style} source={{uri: url}} />
	}

	renderRate(stars) {
		let starIcons = [];

		for (let i = 1; i <= 5; i++) {
			if (i < stars) {
				starIcons.push(<Icon key={i} name="star" size={10} color="#fd9600" />);
				continue;
			}
			if (i - stars <= 0.5) {
				starIcons.push(<Icon key={i} name="star-half-o" size={10} color="#fd9600" />);
				continue;
			}
			starIcons.push(<Icon key={i} name="star-o" size={10} color="#fd9600" />);
		}

		return (
		<View style={COMMON.rate}>
			{starIcons.map((icon) => {return icon})}
		</View>
		);
	}

	renderFlightDetails() {
		const {flight} = this.state;

		return (
			<EventWidget title={'Flight Ticket'}>
				{
					flight.legs.map((detail, index) => {
						return (
							<View key={index} style={[COMMON.row, COMMON.separator]}>
								<View style={COMMON.mrgR5}>
									{this.renderImage(style.image, 'https://pbs.twimg.com/profile_images/635867807981379584/sA1V-rRi_400x400.jpg')}
									<View style={[style.itemRow, {justifyContent: 'center'}]}>
										<Text style={COMMON.fs12}>
											{detail.segments[0].departureAirportCode} - {detail.segments[0].arrivalAirportCode}
										</Text>
									</View>
								</View>
								<View style={{flex: 1}}>
									<View style={style.itemRow}>
										<Text style={style.itemTitle} ellipsizeMode="middle" numberOfLines={1}>
											{`${detail.segments[0].departureAirportAddress.city} - ${detail.segments[0].arrivalAirportAddress.city}`}
										</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={style.subTitle} ellipsizeMode="tail" numberOfLines={2}>
											{detail.segments[0].departureTime + ' - ' + detail.segments[0].arrivalTime}
										</Text>
									</View>
									<View style={style.itemRow}>
										<Icon name="plane" size={12} color="black" style={COMMON.mrgR5} />
										<Text style={[COMMON.mrgR5, COMMON.subTitle, {color: 'black'}]} ellipsizeMode="tail" numberOfLines={2}>
											{detail.segments[0].duration + ' | ' + detail.segments[0].equipmentDescription + ' №' + detail.segments[0].flightNumber}
										</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={COMMON.price}>{flight.offers[index].totalFarePrice.formattedPrice}</Text>
										<Text style={{fontSize: 12, fontWeight: 'bold'}}>(per passenger)</Text>
									</View>
								</View>
							</View>
						)
					})
				}
			</EventWidget>
		)
	}

	renderHotelDetails() {
		const {hotels} = this.state;

		return (
			<EventWidget title={'Hotel Reserve'}>
				{
					hotels.map((hotel, index) => {
						return (
							<View key={index} style={[COMMON.row, COMMON.separator]}>
								<View style={COMMON.mrgR5}>
									{this.renderImage(style.image, (IMAGES_TRVL + hotel.largeThumbnailUrl))}
									{this.renderRate(+hotel.hotelGuestRating)}
								</View>
								<View style={{flex: 1}}>
									<View style={style.itemRow}>
										<Text style={style.itemTitle} ellipsizeMode="middle" numberOfLines={1}>{hotel.name}</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={style.subTitle} ellipsizeMode="tail" numberOfLines={1}>{hotel.address}</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={style.description} ellipsizeMode="tail" numberOfLines={2}>{hotel.shortDescription}</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={COMMON.price}>
											{hotel.lowRateInfo.currencySymbol + hotel.lowRateInfo.strikethroughPriceToShowUsers}
										</Text>
										<Text style={{fontSize: 12, fontWeight: 'bold'}}>(avg/night)</Text>
										<Text style={COMMON.discount}>{hotel.shortDiscountMessage}</Text>
									</View>
								</View>
							</View>
						);
					})
				}
			</EventWidget>
		)
	}

	renderCarDetails() {
		const {cars} = this.state;

		return (
			<EventWidget title={'Car Rental'}>
				{
					cars.map((car, index) => {
						return (
							<View key={index} style={[COMMON.row, COMMON.separator]}>
								<View>
									{this.renderImage([style.image, {width: 85, height: 50}], ((car.ThumbnailUrl.replace(/_t.jpg/, '_s.jpg'))))}
									<View style={[style.itemRow, {justifyContent: 'center'}]}>
										<Icon name="user" size={12} color="black" style={COMMON.mrgR5} />
										<Text style={[COMMON.fs12, COMMON.mrgR5]}>{car.Capacity.AdultCount}</Text>
										<Icon name="snowflake-o" size={12} color="#00caff" style={COMMON.mrgR5} />
										<Text style={COMMON.fs12}>{'A/C'}</Text>
									</View>
								</View>
								<View style={{flex: 1}}>
									<View style={style.itemRow}>
										<Text style={style.itemTitle} ellipsizeMode="middle" numberOfLines={1}>
											{car.SupplierName}
										</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={style.subTitle} ellipsizeMode="tail" numberOfLines={1}>
											{car.CarMakeModel} ({car.CarClass})
										</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={style.dateTime}>{car.PickupInfo.DateTime} - </Text>
										<Text style={style.dateTime}>{car.DropOffInfo.DateTime}</Text>
									</View>
									<View style={style.itemRow}>
										<Text style={COMMON.price}>${car.Price.BaseRate.Value}</Text>
										<Icon name="car" size={12} style={COMMON.mrgR5} />
										<Text style={style.subTitle}>(per/week)</Text>
									</View>
								</View>
							</View>
						)
					})
				}
			</EventWidget>
		)
	}

	render() {
		const {event, flight, hotels, cars, activeSpinner} = this.state;

		if (!event) {
			return false;
		}

		const location = readData(event, '_embedded.venues.0', Object);
		const date = event['dates'];
		const images = event.images;

		return (
			<ScrollView style={style.content}>
				<Spinner visible={activeSpinner} />

				<View>
					<Image style={{width: 360, height: 300}} source={{uri: images[images.length -1].url}} />
				</View>

				<Text style={style.title}>{event.name}</Text>
				<View style={COMMON.row}>
					<Text>{event.info || event.pleaseNote}</Text>
				</View>

				{location.readable &&
				<View style={COMMON.row}>
					<Text style={style.eventTitleRow}>
						{readData(location.value, 'country.name', String).value || N_A}
					</Text>
					<Text>
						{readData(location.value, 'city.name', String).value || N_A
						+ ' | ' + readData(location.value, 'address.line1', String).value || N_A}
					</Text>
				</View>}

				<View style={COMMON.row}>
					<Text style={style.eventTitleRow}>Date</Text>
					<Text>{date.start.localDate + ' ' + date.start.localTime}</Text>
				</View>
				<View>
					{flight && this.renderFlightDetails()}
					{hotels && this.renderHotelDetails()}
					{cars && this.renderCarDetails()}
				</View>
			</ScrollView>
		)
	}
}

export default Details;
