import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CenteredSpin from '../../components/UI/spinner/centered-spin';
import classes from './Auth.css';
import AuxHoc from '../../hoc/Aux-hoc/Aux-hoc';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../utility/utility';
import axios from '../../axios-instance';

class Auth extends Component {
	state = {
		controls: {
			username: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Username'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		isSignup: true,
		openPopup: true
	}

	componentDidMount() {
		if (this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			})
		});
		this.setState({ controls: updatedControls });
	}

	submitHandler = (event) => {
		if (!this.state.controls.username.value && !this.state.controls.password.value) {
			event.preventDefault();
			return;
		}
		event.preventDefault();
		this.props.onAuth(this.state.controls.username.value, this.state.controls.password.value);
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({ id: key, config: this.state.controls[key] });
		}

		let form = formElementsArray.map(formElement => (<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={(event) => this.inputChangedHandler(event, formElement.id)} />));

		if (this.props.loading) {
			form = <CenteredSpin />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			);
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}

		return (
			<AuxHoc>
				<div className={classes.Auth}>
					{authRedirect}
					{errorMessage}
					<h1>Material Selector</h1>
					<form onSubmit={this.submitHandler}>
						{form}
						{!this.props.loading ? <Button btnType="Success">Log In</Button> : null }
					</form>
				</div>
			</AuxHoc>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		userDetails: state.auth.userDetails,
		error: state.auth.error,
		isAuthenticated: state.auth.expirationDate !== null,
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapStateToDispatch = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.auth(username, password)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapStateToDispatch)(withErrorHandler(Auth, axios));