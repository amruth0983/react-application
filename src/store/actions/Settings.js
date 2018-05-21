import * as actionTypes from './action-types';

export const getDivisionAttrs = (division) => {
	return {
		type: actionTypes.GET_DIVISION_ATTRIBUTES,
		division: division
	};
};

export const setDivisionAttrs = (division, attrs) => {
	return {
		type: actionTypes.SET_DIVISION_ATTRIBUTES,
    division: division,
    attrs: attrs
	};
};