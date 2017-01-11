/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import React, {Component} from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';

const style = StyleSheet.create({
	header: {
		height: 20,
		backgroundColor: '#3dbf24',
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'flex-end',
		borderBottomColor: '#0bb117',
		borderBottomWidth: 1,
		borderStyle: 'solid'
	},
	title: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 16
	}
});
class Header extends Component {
	render() {
		return <View style={style.header}>
			<StatusBar backgroundColor={'#3dbf24'} />
			<Text style={style.title}>TKM ORDER PACKAGING</Text>
		</View>
	}
}

export default Header;