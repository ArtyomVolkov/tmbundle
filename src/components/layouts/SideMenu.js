/**
 * Created by Artem_Volkov on 05-Jan-17.
 */
import React, {Component} from 'react';
import {View, Text, Slider, StyleSheet, ScrollView, Button} from 'react-native';
// actions
import {changeSearchOptions} from './../../actions/options';
// components
import MenuItemWidget from './../widgets/MenuItemWidget';

// Styles
import COMMON from './../../mobileStyles/common';
const style = StyleSheet.create({
	statusBar: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: 5
	},
	title: {
		textAlign: 'right'
	},
	resetBtn: {
		maxWidth: 80
	},
	textValue: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold'
	}
});

class SubMenu extends Component {
	static defaultProps = {
		events: 20,
		eventItems: 20,
		flights: 1,
		flightItems: 1,
		hotels: 3,
		hotelItems: 3,
		cars: 3,
		carItems: 3
	};

	constructor(props) {
		super(props);

		this.state = {
			events: props.events,
			eventItems: props.events,
			flights: props.flights,
			flightItems: props.flights,
			hotels: props.hotels,
			hotelItems: props.hotels,
			cars: props.cars,
			carItems: props.cars
		};
	}

	onChangeOptions(key, value){
		changeSearchOptions(key, value);
		this.setState({[key]: value});
	}

	onResetOptions =()=> {
		this.setState({
			events: 20,
			eventItems: 20,
			flights: 1,
			flightItems: 1,
			hotels: 3,
			hotelItems: 3,
			cars: 3,
			carItems: 3
		});
	};

	render(){
		const {state} = this;

		return (
			<View>
				<View style={style.statusBar}>
					<View style={style.resetBtn}>
						<Button title="Reset" color="#2E94F4" onPress={this.onResetOptions} />
					</View>
					<View style={{flex: 1, justifyContent: 'flex-end'}}>
						<Text style={[COMMON.title, style.title]}>Search options</Text>
					</View>
				</View>
				<ScrollView>
					<MenuItemWidget title="Number of event items">
						<View>
							<Text style={style.textValue}>{state.eventItems}</Text>
							<Slider minimumValue={5} maximumValue={100} step={5} value={state.events}
								onValueChange={(value) => this.setState({eventItems: value})}
								onSlidingComplete={this.onChangeOptions.bind(this, 'events')} />
						</View>
					</MenuItemWidget>

					<MenuItemWidget title="Number of flight tickets">
						<View>
							<Text style={style.textValue}>{state.flightItems}</Text>
							<Slider minimumValue={1} maximumValue={10} step={1} value={state.flights}
								onValueChange={(value) => this.setState({flightItems: value})}
								onSlidingComplete={this.onChangeOptions.bind(this, 'flights')} />
						</View>
					</MenuItemWidget>

					<MenuItemWidget title="Number of hotel results">
						<View>
							<Text style={style.textValue}>{state.hotelItems}</Text>
							<Slider minimumValue={1} maximumValue={10} step={1} value={state.hotels}
								onValueChange={(value) => this.setState({hotelItems: value})}
								onSlidingComplete={this.onChangeOptions.bind(this, 'hotels')} />
						</View>
					</MenuItemWidget>

					<MenuItemWidget title="Number of Car rental">
						<View>
							<Text style={style.textValue}>{state.carItems}</Text>
							<Slider minimumValue={1} maximumValue={10} step={1} value={state.cars}
								onValueChange={(value) => this.setState({carItems: value})}
								onSlidingComplete={this.onChangeOptions.bind(this, 'cars')} />
						</View>
					</MenuItemWidget>
				</ScrollView>
			</View>
		)
	}
}

export default SubMenu;
