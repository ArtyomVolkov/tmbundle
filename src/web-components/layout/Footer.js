/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import React, {Component} from 'react';

import * as style from './Footer.styl';

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class={style.title}>
				<span>TKM order packaging</span>
			</div>
		)
	}
}

export default Footer;
