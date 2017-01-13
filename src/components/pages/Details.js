/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
// components
import EventWidget from './../widgets/EventWidget';
import Button from './../custom/buttons/Button';
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
		marginTop: 55,
		padding: 10
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#414141',
		marginTop: 20,
		marginBottom: 20
	},
	eventImg: {
		width: 350,
		height: 300,
		borderWidth: 1,
		borderColor: '#dcdcdc'
	},
  price: {
	  fontWeight: 'bold',
    color: '#b7c9d3'
  },
	itemRow: {
		justifyContent: 'flex-start',
    marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'flex-start'
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
		fontSize: 16,
		color: '#768692'
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
			<EventWidget title={'FLIGHT TICKETS'}>
				{
					flight.legs.map((detail, index) => {
						return (
							<View key={index} style={[COMMON.row, COMMON.separator]}>
								<View style={{flex: 1}}>
                  <View style={style.itemRow}>
                    <Icon name="clock-o" size={20} color="#b7c9d3" style={COMMON.mrgR20} />
                    <View style={{flex: 1}}>
                      <Text style={[COMMON.dateTime, COMMON.mrgB10, {flex: 1}]}>{detail.segments[0].departureTime}</Text>
                      <Text style={[COMMON.dateTime, {flex: 1}]}>{detail.segments[0].arrivalTime}</Text>
                    </View>
                  </View>
                  <View style={style.itemRow}>
                    <Icon name="plane" size={20} color="#b7c9d3" style={COMMON.mrgR20} />
                    <View style={{flex: 1}}>
                      <Text ellipsizeMode='tail' numberOfLines={2} style={[COMMON.mrgB10, style.description, {flex: 1}]}>
                        {detail.segments[0].departureAirportAddress.city + ` (${detail.segments[0].departureAirportCode}) - ` +
                        detail.segments[0].arrivalAirportAddress.city + ` (${detail.segments[0].arrivalAirportCode})`}
                      </Text>
                      <Text style={COMMON.text}>Flight Number: <Text style={COMMON.value}>{detail.segments[0].flightNumber}</Text></Text>
                      <Text style={COMMON.text}>Plane: <Text style={COMMON.value}>{detail.segments[0].equipmentDescription}</Text></Text>
                      <Text style={COMMON.text}>Duration: <Text style={COMMON.value}>{detail.segments[0].duration}</Text></Text>
                    </View>
                  </View>
									<View style={style.itemRow}>
                    <Icon name="ticket" size={20} color="#b7c9d3" style={COMMON.mrgR20} />
                    <Text style={style.price}>PRICE (per person)</Text>
									</View>
                  <View style={[style.itemRow, {justifyContent: 'center'}]}>
                    <Text style={COMMON.price}>{flight.offers[index].totalFarePrice.formattedPrice}</Text>
                  </View>
                  <View style={[style.itemRow, {justifyContent: 'center'}]}>
                    <View style={{flex: 1}}>
                      <Button title="BUY A TICKET" onPress={null}/>
                    </View>
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
			<EventWidget title={'HOTEL RESERVATION'}>
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
			<EventWidget title={'CAR RENTAL'}>
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
				<Text style={style.title} ellipsizeMode='tail' numberOfLines={2}>
					{event.name}
				</Text>
				<View style={COMMON.row}>
					<Image style={[style.eventImg]} source={{uri: images[images.length -1].url}} />
				</View>
				<View style={COMMON.row}>
					<Icon name="clock-o" size={20} color="#b7c9d3" style={COMMON.mrgR20} />
					<Text style={COMMON.dateTime}>
						{date.start.localDate + ' ' + date.start.localTime}
					</Text>
				</View>
        {location.readable &&
				<View style={COMMON.row}>
					<Icon name="map-marker" size={20} color="#b7c9d3" style={COMMON.mrgR20} />
					<Text ellipsizeMode='tail' numberOfLines={2} style={style.description}>
            {readData(location.value, 'country.name', String).value || N_A
							+ ' | ' + readData(location.value, 'city.name', String).value || N_A
            	+ ' | ' + readData(location.value, 'address.line1', String).value || N_A
            }
					</Text>
				</View>}
				<View style={COMMON.row}>
					<Text style={style.description}>{event.info || event.pleaseNote || 'No description of event'}</Text>
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
