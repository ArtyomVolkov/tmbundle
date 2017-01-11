/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import React, {Component} from 'react';

// Style
import * as style from './Header.styl';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div class={style.title}>
				<span>TKM / Develop</span>
			</div>
		)
	}
}

export default Header;
