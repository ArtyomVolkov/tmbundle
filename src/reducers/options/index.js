/**
 * Created by Artem_Volkov on 06-Jan-17.
 */
import { combineReducers } from 'redux';

// reducers
import events from './events';
import flights from './flights';
import hotels from './hotels';
import cars from './cars';

const options = combineReducers({
	events,
	flights,
	hotels,
	cars
});

export default options;
