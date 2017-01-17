/**
 * Created by Artem_Volkov on 13-Jan-17.
 */
import React, {Component} from 'react';
// utils
import {checkImageURL} from './../../../utils/common';
// style
import * as style from './Image.styl';

class Image extends Component {
	constructor(props) {
		super(props);

		this.state = {
			URL: null
		};
		this.checkURL(props.urls);
	}

	checkURL(urls) {
		const {state} = this;

		for (let i = 0; i < urls.length; i++) {
			checkImageURL(urls[i]).then((data) => {
				if (data !== 'timeout' && !state.URL) {
					this.setState({
						URL: data
					});
				}
			});
		}
	}
	
	render() {
		const {props, state} = this;

		if (!state.URL) {
			return false;
		}
		return <img class={style.image} src={state.URL} alt={props.alt} width={props.width} height={props.height} />
	}
}

export default Image;

