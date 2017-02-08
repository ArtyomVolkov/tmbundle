/**
 * Created by Artem_Volkov on 22-Dec-16.
 */
import {render} from 'react-dom';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, IndexRedirect, hashHistory} from 'react-router';
import STORE from './store/index';

// web components
import Header from './web-components/layout/Header';
import Footer from './web-components/layout/Footer';
import Page from './web-components/layout/Page';
// pages
import Search from './web-components/pages/Search';
import Details from './web-components/pages/Details';

render(
	<Provider store={STORE}>
		<Router history={hashHistory}>
			<Route path="/" component={Page}>
				<IndexRedirect to="/search" />
				<Route path="search" components={{content: Search, header: Header, footer: Footer}} />
				<Route path="search/:eventId/view" components={{content: Details, header: Header, footer: Footer}} />
			</Route>
			<Redirect path="*" to="search"/>
		</Router>
	</Provider>,
	document.getElementById('app')
);
