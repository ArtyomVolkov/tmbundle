/**
 * Created by Artem_Volkov on 23-Dec-16.
 */
import {createStore} from 'redux';
import ROOT from '../reducers/index';

const STORE = createStore(ROOT,
	window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
);

// STORE.subscribe(() => {
// 	console.log(STORE.getState());
// });

export default STORE;
