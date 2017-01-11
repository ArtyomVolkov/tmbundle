/**
 * Created by Artem_Volkov on 05-Jan-17.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Style
const style = StyleSheet.create({
	content: {
		margin: 5,
		borderWidth: 1,
		borderColor: '#a7a7a7',
		borderStyle: 'solid'
	},
	header: {
		backgroundColor: '#F6F7F9',
		padding: 5,
		borderBottomWidth: 1,
		borderColor: '#a7a7a7',
		borderStyle: 'solid'
	},
	title: {
		color: 'black',
		textAlign: 'center',
		fontSize: 14,
		paddingLeft: 10,
		fontWeight: 'bold',
		paddingBottom: 5
	},
	body: {
		padding: 10
	}
});

class MenuItemWidget extends Component {
	render() {
		const {props} = this;
		return (
			<View style={style.content}>
				<View style={style.header}>
					<Text style={style.title}>{props.title}</Text>
				</View>
				<View style={style.body}>
					{props.children}
				</View>
			</View>
		)
	}
}

export default MenuItemWidget;
