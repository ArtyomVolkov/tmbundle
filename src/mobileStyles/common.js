/**
 * Created by Artem_Volkov on 03-Jan-17.
 */
import {StyleSheet} from 'react-native';

const COMMON = StyleSheet.create({
	title: {
		fontSize: 16,
		color: 'black',
		marginBottom: 10,
		fontWeight: 'bold'
	},
	subTitle: {
		fontSize: 14,
		fontWeight: 'bold',
    opacity: 0.7,
		color: '#414141',
    marginBottom: 5
	},
	dateTime: {
		color: '#768692',
		fontWeight: 'bold',
		fontSize: 16
	},
	rate: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		paddingTop: 15
	},
	price: {
    color: '#b7c9d3',
    fontWeight: 'bold',
    fontSize: 54
	},
	discount: {
		color: '#06bf06',
		fontWeight: 'bold',
		marginLeft: 15
	},
	separator: {
		borderBottomWidth: 1,
		borderColor: '#b7c9d3'
	},
	row: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 2,
		paddingRight: 2
	},
	itemRow: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center'
	},
  text: {
	  color: '#b7c9d3',
    fontSize: 16,
    marginBottom: 8
  },
  value: {
	  color: '#768692',
    fontSize: 16
  },
	mrgR5: {
		marginRight: 5
	},
	mrgR20: {
		marginRight: 20
	},
  mrgT20: {
	  marginTop: 20
  },
  mrgB5: {
	  marginBottom: 5
  },
  mrgB10: {
	  marginBottom: 10
  },
	fs12: {
		fontSize: 12
	}
});

export default COMMON;