/**
 * Created by Artem_Volkov on 29-Dec-16.
 */
import React, {Component} from 'react';
import ReactSpinner from 'react-spin';

class Spinner extends Component {
	constructor(props) {
		super(props);
		
		this.options = {
			length: 8,
			width: 3,
			radius: 7,
			corners: 10,
			color: 'rgb(79, 81, 88)'
		}
		
	}
	
	render() {
		return <ReactSpinner spinnerOpts={this.options}/>
	}
}

export default Spinner;