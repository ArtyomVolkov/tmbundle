/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Button, Alert,
	ListView, TouchableHighlight, ToolbarAndroid, Image, Keyboard, ActivityIndicator, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

// utilities
import {readData} from './../../utils/common';
import {N_A} from './../../settings';

// store
import STORE from './../../store/index';
// Actions
import {getEvents} from '../../actions/apis';
// Styles
import COMMON from './../../mobileStyles/common';
const style = StyleSheet.create({
	body: {
		backgroundColor: '#F6F6F6',
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
		borderColor: '#b3b3b3',
		borderRadius: 3
	},
	img: {
		width: 60,
		height: 60,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 2
	},
	searchBar: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 55,
		borderBottomColor: '#b3b3b3',
		borderBottomWidth: 1,
		borderStyle: 'solid'
	},
	spinner: {
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8
	},
	dateTime: {
		fontSize: 12,
		fontWeight: 'bold'
	}
});

class Page extends Component {
	constructor(props) {
		super(props);
		// array with empty items
		this.state = {
			searchTerm: '',
			activeSpinner: false,
			items: []
		};
	}

	renderItems =()=> {
		const {state} = this;

		return state.items.map((item, index) => {
			return (
				<TouchableHighlight underlayColor={'#dcdcdc'}
					key={index}
					onPress={this.goToDetails.bind(this, item)}>
					<View style={[COMMON.row, COMMON.separator]}>
						<View style={{marginRight: 5}}>
							<Image style={style.img} source={{uri: item.images[0].url}} />
						</View>
						<View style={{flex: 1}}>
							<View style={COMMON.itemRow}>
								<Text ellipsizeMode='tail' numberOfLines={1} style={COMMON.title}>
									{item.name}
								</Text>
							</View>
							<View style={COMMON.itemRow}>
								<Text style={COMMON.subTitle}>
									{readData(item, '_embedded.venues.0.country.name', String).value || N_A}
								</Text>
							</View>
							<View style={COMMON.itemRow}>
								<Text style={style.dateTime}>
									{readData(item, 'dates.start.localDate', String).value + ' '
									+ readData(item, 'dates.start.localTime', String).value}
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

	render(){
		const {state} = this;

		return (
			<View style={style.body}>
				<View style={style.searchBar}>
					<View style={{flex: 0.5, padding: 5}}>
						<TextInput style={style.input}
						 editable={true}
						 onChangeText={this.onChangeInputSearch}/>
					</View>
					<View style={{flex: 0.25, paddingTop: 10, paddingRight: 5}}>
						<Button onPress={this.onSearchEvent}
							title={'search'}
							accessibilityLabel="Ok"
						/>
					</View>
					<Spinner visible={state.activeSpinner} />
				</View>
				<ScrollView style={style.scrollView} ref={ref => this.listView = ref}>
					{this.renderItems()}
				</ScrollView>
			</View>
		);
	}
}

export default Page;
