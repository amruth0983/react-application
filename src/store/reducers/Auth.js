import * as actionTypes from '../actions/action-types';
import {updateObject} from '../../utility/utility';

const initialState = {
	loading: false,
	userDetails: null,
	error: null,
	authRedirectPath: '/',
	expirationDate: null
}

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true
	});
}

const authSuccess = (state, action) => {
	return updateObject(state, {
		userDetails: action.userDetails,
		expirationDate: action.expirationDate,
		error: null,
		loading: false
	});
}

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	});
}

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, {authRedirectPath: action.path})
}

const authLogout = (state, action) => {
	return updateObject(state, {
		error: null,
		userDetails: null
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		default:
			return state;
	}
}

export default reducer;