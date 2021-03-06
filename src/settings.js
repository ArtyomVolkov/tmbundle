/**
 * Created by Artem_Volkov on 20-Dec-16.
 */
// APIs
export const EVENTS_API = 'https://app.ticketmaster.com/discovery/v2/events.json';
//export const EVENTS_API_ALT = 'https://stage.tkm-fbb.projects.epam.com/messenger/relevance/search';
export const EVENTS_API_ALT = 'https://degratnik-prod.apigee.net/tmbundle-nlp';
//export const FLIGHT_SEARCH_API = 'http://terminal2.expedia.com/x/mflights/search';
//export const HOTEL_SEARCH_API = 'http://terminal2.expedia.com/x/mhotels/search';
//export const CAR_RENTAL_API = 'http://terminal2.expedia.com/x/cars/search';
export const FLIGHT_SEARCH_API = 'https://degratnik-prod.apigee.net/expedia-tmbundle/mflights/search';
export const HOTEL_SEARCH_API = 'https://degratnik-prod.apigee.net/expedia-tmbundle/mhotels/search';
export const CAR_RENTAL_API = 'https://degratnik-prod.apigee.net/expedia-tmbundle/cars/search';
export const AIRPORT_LIST_API = 'http://openflights.org/php/apsearch.php';
export const IMAGES_TRVL = 'https://images.trvl-media.com';
// db api
//export const USERS = 'http://localhost:8081/api/v1/users';
export const USERS = 'https://tmbundle.herokuapp.com/api/v1/users';
//graphQL API
//export const GRAPH_QL_API = 'http://localhost:8081/api/v1/tkm';
export const GRAPH_QL_API = 'https://tmbundle.herokuapp.com/api/v1/tkm';


// Google maps
export const GOOGLE_MAPS = 'http://maps.google.com/?q=';

// API keys
export const API_KEY = '08GmdRKC7W1GxALpDlGPHmIbfTGKyAwv';
export const EXPEDIA_API_KEY = 'QII5m1ws5e8grab0p4DEAuwXNcASRFtp';

// other
export const RESULTS_LIMIT = 3;
export const TRIP_DAYS = 3;
export const EVENTS_COUNT = 20;
export const FLIGHT_TICKETS = 2;
export const HOTEL_RESULTS = 3;
export const RENTAL_CARS = 3;
export const N_A = 'N/A';
export const USER_CITY = 'Los Angeles';

// Date formats
export const DATE_SEARCH_FORMAT = 'YYYY-MM-DD';
export const DATE_DISPLAY_FORMAT = 'ddd, ll h:mm A';