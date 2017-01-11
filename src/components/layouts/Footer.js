/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const style = StyleSheet.create({
	footer: {
		height: 30,
		alignSelf: 'stretch',
		backgroundColor: 'green',
		textAlign: 'center'
	}
});

class Footer extends Component {
	render() {
		return <View style={style.footer}>
			<Text>Footer</Text>
		</View>
	}
}

export default Footer;