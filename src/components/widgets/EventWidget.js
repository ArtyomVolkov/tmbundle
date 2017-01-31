/**
 * Created by Artem_Volkov on 30-Dec-16.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

const style = StyleSheet.create({
	content: {
	  marginTop: 20
	},
	body: {
		padding: 0
	},
  header: {
	  borderBottomWidth: 1,
		borderStyle: 'solid',
    borderBottomColor: '#b7c9d3',
		marginBottom: 15
  },
	title: {
		color: '#b7c9d3',
		fontSize: 16,
		fontWeight: 'bold',
		paddingBottom: 5
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