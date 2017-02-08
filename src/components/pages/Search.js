/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Alert,
	ListView, TouchableHighlight, ToolbarAndroid, Image, Keyboard, ActivityIndicator, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

// components
import Button from './../custom/buttons/Button';

// utilities
import {readData} from './../../utils/common';
import {USER_CITY} from './../../settings';

// store
import STORE from './../../store/index';

// Actions
import {getEvents, getEventsAlt, getAirportCodeByCity} from '../../actions/apis';

// Styles
import COMMON from './../../mobileStyles/common';
const style = StyleSheet.create({
	body: {
		backgroundColor: '#F6F6F6',
		padding: 15,
		flex: 1
	},
	scrollView: {
		backgroundColor: '#F6F6F6',
		flex: 1,
		height: 600
	},
	input: {
		height: 45,
		borderWidth: 1,
    padding: 5,
		borderColor: '#b3b3b3',
		marginBottom: 20,
		borderRadius: 3
	},
	btnBar: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	btnL: {
		flex: 0.5,
		marginRight: 10
	},
	btnR: {
		flex: 0.5
	},
	img: {
		width: 80,
		height: 80,
		borderWidth: 1,
		borderColor: '#dcdcdc'
	},
	searchBar: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 65
	},
  itemsTab: {
		marginTop: 20,
    flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#b7c9d3'
	},
	itemsTabText: {
    color: '#b7c9d3',
		fontWeight: 'bold'
	},
	details: {
		fontSize: 14,
		color: '#414141'
	},
	itemsTabValue: {
		marginLeft: 5,
		fontWeight: 'bold',
		color: '#768692'
	},
	spinner: {
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8
	}
});

class Search extends Component {
	constructor(props) {
		super(props);
		// array with empty items
		const state = STORE.getState();
		this.state = {
			searchTerm: '',
			activeSpinner: false,
			items: []
		};

		if (!state.options.userCity) {
			this.getUserLocation();
		}
	}

	getUserLocation() {
		getAirportCodeByCity(USER_CITY).then((response) => {
			STORE.dispatch({type: 'SET_USER_CITY', userCity: {
				cityName: USER_CITY,
				airportCode: response['data'].data.cities[0].airportCode
			}});
		});
	}

	renderItems =()=> {
		const {state} = this;

		return state.items.map((item, index) => {
			return (
				<TouchableHighlight underlayColor={'#dcdcdc'}
					key={index}
					onPress={this.goToDetails.bind(this, item)}>
					<View style={[COMMON.row, COMMON.separator]}>
						<View style={{marginRight: 10}}>
							<Image style={style.img} source={{uri: item.images[0].url}} />
						</View>
						<View style={{flex: 1}}>
							<View style={COMMON.itemRow}>
								<Text ellipsizeMode='tail' numberOfLines={2} style={COMMON.title}>
									{item.name}
								</Text>
							</View>
							<View style={COMMON.itemRow}>
								<Text style={COMMON.subTitle}>
                  {readData(item, 'dates.start.localDate', String).value + ' '
                  + readData(item, 'dates.start.localTime', String).value}
								</Text>
							</View>
							<View style={COMMON.itemRow}>
								<Text ellipsizeMode='tail' numberOfLines={3} style={style.details}>
                  {item.info || item.pleaseNote|| 'No description of event'}
								</Text>
							</View>
						</View>
					</View>
				</TouchableHighlight>
			)
		})
	};

	goToDetails(item){
		STORE.dispatch({type: 'SET_EVENT_DETAILS', eventDetails: item});
		Actions.details({title: item.name || 'Details'});
	}

	onChangeInputSearch =(value)=> {
		this.state.searchTerm = value;
	};

	onSearchEvent =()=> {
		const {state} = this;

		if (!state.searchTerm) {
			return;
		}

		STORE.dispatch({type: 'CHANGE_SEARCH_TERM', term: state.searchTerm});
		Keyboard.dismiss();
		
		this.setState({
			activeSpinner: true
		});

		getEvents(state.searchTerm).then((response) => {
			if (!response.data.page.totalElements) {
				Alert.alert('Info', 'No events with such name!');
				this.setState({
					activeSpinner: false
				});
				return;
			}

			if (this.listView) {
				this.listView.scrollTo({y: 0});
			}

			STORE.dispatch({type: 'GET_EVENT_LIST', items: response.data['_embedded'].events});
			this.setState({
				items: response.data['_embedded'].events,
				activeSpinner: false
			});
		}).catch((error) => {
			Alert.alert('Error', (error.message || 'Internal server error'));
			this.setState({
				activeSpinner: false
			});
		})
	};

    onSearchEventAlt =()=> {
		const {state} = this;

		if (!state.searchTerm) {
			return;
		}

		STORE.dispatch({type: 'CHANGE_SEARCH_TERM', term: state.searchTerm});
		Keyboard.dismiss();
		
		this.setState({
			activeSpinner: true
		});

		getEventsAlt(state.searchTerm).then((response) => {
			if (!response.data.events.page.totalElements) {
				Alert.alert('Info', 'No events with such name!');
				this.setState({
					activeSpinner: false
				});
				return;
			}

			if (this.listView) {
				this.listView.scrollTo({y: 0});
			}

			STORE.dispatch({type: 'GET_EVENT_LIST', items: response.data.events['_embedded'].events});
			this.setState({
				items: response.data.events['_embedded'].events,
				activeSpinner: false
			});
		}).catch((error) => {
			Alert.alert('Error', (error.message || 'Internal server error'));
			this.setState({
				activeSpinner: false
			});
		})
	};

	render(){
		const {state} = this;

		return (
			<View style={style.body}>
				<View style={style.searchBar}>
					<View style={{flex: 1}}>
						<TextInput style={style.input}
						 editable={true}
						 onChangeText={this.onChangeInputSearch} />
					</View>
				</View>
				<View style={style.btnBar}>
					<View style={style.btnL}>
						<Button onPress={this.onSearchEventAlt}
							title={'NLP SEARCH'}
							accessibilityLabel="Ok"
						/>
					</View>
					<View style={style.btnR}>
						<Button onPress={this.onSearchEvent}
							title={'SIMPLE SEARCH'}
							accessibilityLabel="Ok"
						/>
					</View>
				</View>
				<Spinner visible={state.activeSpinner} />
				{
          state.items.length > 0 &&
					<View style={style.itemsTab}>
						<Text style={style.itemsTabText}>EVENT LIST</Text>
						<Text style={style.itemsTabValue}>{state.items.length} events</Text>
					</View>
				}
				<ScrollView style={style.scrollView} ref={ref => this.listView = ref}>
					{this.renderItems()}
				</ScrollView>
			</View>
		);
	}
}

export default Search;
