/**
 * Created by Artem_Volkov on 06-Jan-17.
 */
import {RENTAL_CARS} from './../../settings';
import {CHANGE_CAR_RESULTS} from './../../actions/options';

export default function cars(state = RENTAL_CARS, action) {
	if (action.type === CHANGE_CAR_RESULTS) {
		return action.cars;
	}

	return state;
}