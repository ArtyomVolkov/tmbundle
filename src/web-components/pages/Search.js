/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import React, {Component} from 'react';

import STORE from '../../store/index';

// Actions
import {getEvents, getEventsAlt, getAirportCodeByCity} from '../../actions/apis';
import {getUsers} from '../../actions/db-actions';

// settings
import {USER_CITY} from './../../settings';

// Components
import Events from './../lists/Events';
import Spinner from './../custom-components/spinner/Spinner';

// Styles
import * as STYLE from './../../styles/common.styl';
import * as style from './Search.styl';

class Search extends Component {
	constructor(props) {
		super(props);

		const state = STORE.getState();
		this.state = {
			searchTerm: state.searchTerm,
			activeSpinner: false,
			events: state.eventList,
			eventsAlt: state.eventsAltList
		};

		if (!state.options.userCity) {
			this.getUserLocation();
		}
	}

	getUserLocation() {
		getAirportCodeByCity(USER_CITY).then((response) => {
			STORE.dispatch({type: 'SET_USER_CITY', userCity: {
				cityName: USER_CITY,
				airportCode: response['data'].data.cities[0].airportCode
			}});
		});
	}

	onSearchEvent =()=> {
		const {state} = this;

		if (!state.searchTerm) {
			return;
		}
		
		STORE.dispatch({type: 'CHANGE_SEARCH_TERM', term: state.searchTerm});
		
		this.setState({
			activeSpinner: true
		});
		Promise.all([getEvents(state.searchTerm), getEventsAlt(state.searchTerm)])
			.then((responses) => {
                STORE.dispatch({
                	type: 'GET_EVENT_LIST',
					events: responses[0].data['_embedded'].events
                });
                STORE.dispatch({
                    type: 'GET_EVENT_ALT_LIST',
                    events: responses[1].data.events['_embedded'].events
                });
                this.setState({
                    activeSpinner: false,
					events: responses[0].data['_embedded'].events,
					eventsAlt: responses[1].data.events['_embedded'].events,
                });
			})
			.catch((error) => {
                this.setState({
                    activeSpinner: false,
                });
                alert(error.message || 'Internal server error');
			}
		);
	};

	onChangeSearchTerm =(e)=> {
		this.state.searchTerm = e.target.value;
	};

	render() {
		const {state} = this;

		return (
			<div>
				{state.activeSpinner && <Spinner />}
				<div class={style['search-bar']}>
					<div class={STYLE['app-title']}>
						<span>TKM ORDER PACKAGING</span>
					</div>
					<div class={style['search-row']}>
						<div class={style['input-search']}>
							<input type="text" placeholder="Search" onChange={this.onChangeSearchTerm}
								defaultValue={state.searchTerm} />
						</div>
                        <br/>
                        <div class={style['search-btn']}>
							<button class={STYLE['btn-primary']}
								onClick={this.onSearchEvent}
								placeholder="Input search event">Search all
							</button>
						</div>
					</div>
				</div>
				<div class={style['search-results']}>
					<div class={style['nlp-search']}>
						<Events items={state.eventsAlt} title='nlp event list' />
					</div>
					<div class={style['simple-search']}>
						<Events items={state.events} title='default event list' />
					</div>
				</div>
			</div>
		)
	}
}

export default Search;
