import * as actionTypes from './action-types';
import {
	authenticateUser
} from '../../api/api';
import {
	loading
} from './Baskets';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (userInfo, expirationDate) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		userDetails: (typeof userInfo === 'string') ? userInfo : userInfo.user_id,
		expirationDate: expirationDate
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (username, password) => {
	return async (dispatch) => {
		try {
			dispatch(authStart());
			const userInfo = await authenticateUser(username, password);
			const expirationDate = new Date(new Date().getTime() + (3600 * 1000));
			if (userInfo) {
				localStorage.setItem('userDetails', btoa(username + ':' + password));
				localStorage.setItem('expirationDate', expirationDate);
				const userDetails = localStorage.getItem('userDetails');
				dispatch(authSuccess(userDetails, expirationDate));
			} else {
				dispatch(loading(false));
				dispatch(authFail());
			}
		} catch (e) {
			dispatch(loading(false));
			dispatch(authFail(e));
		}
	};
};

export const logout = () => {
	localStorage.removeItem('userDetails');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authCheckState = () => {
	return dispatch => {
		const userDetails = localStorage.getItem('userDetails');
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		if (!userDetails) {
			dispatch(logout());
		} else {
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(userDetails, expirationDate));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};