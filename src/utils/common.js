/**
 * Created by Artem_Volkov on 04-Jan-17.
 */

const item = {
	'_embedded': {
		venues: [{country: {name: 'USA'}}, {country: {name: 'Ukraine'}}, {country: {name: 'Germany'}}]
	}
};

export function readData(obj, path, Type = String) {
	let fields = path.split('.');
	let parent = obj;
	let data = {
		readable: true,
		value: null
	};

	for (let i = 0; i < fields.length; i++) {
		if (parent.hasOwnProperty(fields[i])) {
			parent = parent[fields[i]];
		} else {
			data.readable = false;
			data.value = new Type().valueOf();
			break;
		}
	}

	if (!data.readable) {
		return data;
	}

	data.value = parent;
	return data;
}
