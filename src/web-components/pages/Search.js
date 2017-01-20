/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import React, {Component} from 'react';

import STORE from '../../store/index';

// Actions
import {getEvents} from '../../actions/apis';
import {getUsers} from '../../actions/db-actions';

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
			items: state.eventList
		};
	}

	onSearchEvent =()=> {
		const {state} = this;

		if (!state.searchTerm) {
			return;
		}

		getUsers();
		STORE.dispatch({type: 'CHANGE_SEARCH_TERM', term: state.searchTerm});
		
		this.setState({
			activeSpinner: true
		});

		getEvents(state.searchTerm).then((response) => {
			if (!response.data.page.totalElements) {
				this.setState({
					activeSpinner: false
				});
				alert('No events with such name!');
				return;
			}

			STORE.dispatch({type: 'GET_EVENT_LIST', items: response.data['_embedded'].events});
			this.setState({
				items: response.data['_embedded'].events,
				activeSpinner: false
			});
		}).catch((error) => {
			this.setState({
				activeSpinner: false
			});
			alert(error.message || 'Internal server error');
		});
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
							<input type="text" placeholder="Search" onChange={this.onChangeSearchTerm} defaultValue={state.searchTerm} />
						</div>
						<div class={style['search-btn']}>
							<button class={STYLE['btn-primary']} onClick={this.onSearchEvent} placeholder="Input search event">
								Search Event
							</button>
						</div>
					</div>
				</div>
				<Events items={state.items} />
			</div>
		)
	}
}

export default Search;
