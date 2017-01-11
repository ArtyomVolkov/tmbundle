/**
 * Created by Artem_Volkov on 03-Jan-17.
 */
import {StyleSheet} from 'react-native';

const COMMON = StyleSheet.create({
	title: {
		fontSize: 16,
		color: 'black',
		fontWeight: 'bold'
	},
	subTitle: {
		fontSize: 12,
		color: 'gray',
		fontWeight: 'bold'
	},
	rate: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		paddingTop: 5,
		paddingLeft: 2,
		paddingRight: 5
	},
	price: {
		fontWeight: 'bold',
		marginRight: 5,
		color: '#0795be'
	},
	discount: {
		color: '#06bf06',
		fontWeight: 'bold',
		marginLeft: 5
	},
	separator: {
		borderBottomWidth: 1,
		borderColor: '#a7a7a7'
	},
	row: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 4
	},
	itemRow: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center'
	},
	mrgR5: {
		marginRight: 5
	},
	fs12: {
		fontSize: 12
	}
});

export default COMMON;