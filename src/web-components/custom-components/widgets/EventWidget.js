/**
 * Created by Artem_Volkov on 10-Jan-17.
 */
import React, {Component} from 'react';

// styles
import * as style from './EventWidget.styl';

class EventWidget extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {props} = this;
		return (
			<div class={style['event-widget']}>
				<div class={style['header']}>
					<div class={style['coll-l']}>
						<span class={style['title']}>{props.title}</span>
					</div>
					{props.rightTitle &&
					<div class={style['coll-r']}>
						<span class={style['price']}>
							<b>PRICE</b> (per person)
						</span>
					</div>}
				</div>
				<div class={style['body']}>
					{props.children}
				</div>
			</div>
		)
	}
}

export default EventWidget;