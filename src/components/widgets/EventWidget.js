/**
 * Created by Artem_Volkov on 30-Dec-16.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

const style = StyleSheet.create({
	content: {
		margin: 5,
		borderWidth: 1,
		borderColor: '#a7a7a7',
		borderStyle: 'solid'
	},
	body: {
		padding: 0
	},
	title: {
		color: 'black',
		fontSize: 16,
		paddingLeft: 10,
		fontWeight: 'bold',
		borderBottomWidth: 1,
		paddingBottom: 5,
		borderColor: '#a7a7a7',
		borderStyle: 'solid'
	}
});
class EventWidget extends  Component {
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

export default EventWidget;