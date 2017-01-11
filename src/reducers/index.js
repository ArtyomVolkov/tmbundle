/**
 * Created by Artem_Volkov on 23-Dec-16.
 */
import { combineReducers } from 'redux';
// reducers
import searchTerm from './searchTerm';
import eventList from './eventList';
import eventDetails from './eventDetails';
import options from './options/index';

const ROOT = combineReducers({
	searchTerm,
	eventList,
	eventDetails,
	options
});

export default ROOT;
