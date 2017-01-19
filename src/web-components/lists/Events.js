/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import STORE from '../../store/index';
import moment from 'moment';

import {readData} from './../../utils/common';
import {N_A, DATE_DISPLAY_FORMAT} from './../../settings';

// Style
import * as style from './Events.styl';

class Events extends Component {
	constructor(props) {
		super(props);
	}

	goToDetails(item) {
		STORE.dispatch({type: 'SET_EVENT_DETAILS', eventDetails: item});
		hashHistory.push(`search/${item.id}/view`);
	}

	render() {
		const {items} = this.props;

		if (!items.length) {
			return false;
		}

		return (
			<div class={style['event-items']}>
				<div class={style['items-bar']}>
					<span class={style['list']}>event list</span>
					<span class={style['count']}>{items.length} events</span>
				</div>
				<div class={style['items']}>
					{
						items.map((item, index) => {
							return (
								<div key={index} class={style['row']} onClick={this.goToDetails.bind(this, item)}>
									<img src={(item.images && item.images[0].url) || 'http://kidsti.com/upload/95/small/'} alt="image item" height="140px" width="140" />
									<div class={style['info']}>
										<div class={style['event-name']}>{item.name}</div>
										{readData(item, 'priceRanges.0').readable &&
											<div class={style['event-price-range']}>
												<span>${readData(item, 'priceRanges.0.min').value || N_A} - </span>
												<span>${readData(item, 'priceRanges.0.max').value || N_A}</span>
											</div>
										}
										<div class={style['date']}>{moment(item.dates.start.dateTime).format(DATE_DISPLAY_FORMAT)}</div>
										<div class={style['location']}>
											<span>
												{(readData(item, '_embedded.venues.0.country.name').value || N_A) + ' | '}
											</span>
											<span>
												{(readData(item, '_embedded.venues.0.city.name').value || N_A) + ' | '}
											</span>
											<span>
												{readData(item, '_embedded.venues.0.address.line1').value || N_A}
											</span>
										</div>
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		)
	}
}

export default Events;