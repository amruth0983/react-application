import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import classes from './App.css';
import { setup } from './api/jsx'
import { inCEPEnvironment } from 'cep-interface';
import AppHeader from './components/Header/Header';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';

const loadAsyncBaskets = asyncComponent(() => {
	return import('./components/Baskets/Basket-List');
});

const loadAsyncMaterial = asyncComponent(() => {
	return import('./components/Materials/Part/Footwear/FootwearPart');
});

const loadAsyncSettings = asyncComponent(() => {
	return import('./components/Header/Settings/Settings');
});


class App extends Component {

	componentDidMount() {
		if (inCEPEnvironment()) {
			setup();
		} else {
			this
				.props
				.onTryAutoSignup();
		}
	}

	render() {
		let routes = (
			<Switch>
				<Route path='/auth' component={Auth} />
				<Redirect to='/auth' />
			</Switch>
		);
				const currentRoute = this.props.location;
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path='/auth' component={Auth} />
					<Route path='/part-info' component={loadAsyncMaterial} />
					<Route path='/settings' component={loadAsyncSettings} />
					<Route path='/' exact component={loadAsyncBaskets} />
					<Redirect to='/settings' />
				</Switch>
			)
		}
		return (
			<div className={classes.App}>
				{this.props.isAuthenticated && currentRoute.pathname !== '/settings' ? <AppHeader /> : null}
				{routes}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.expirationDate !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
