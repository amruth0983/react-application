import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../utility/utility';
import { SEASON, BUSINESS_UNIT, CREATION_CENTER } from '../../utility/constants'

const initialState = {
	filtersData: {
		season: [],
		businessunit: [],
		creationcenter: []
	},
	error: null
}

const sendFilterData = (state, action) => {
	return updateObject(state, {
		filtersData: {
			...state.filtersData,
			[action.category]: action.filterData
		}
	});
}

const handleError = (state, action) => {
	return updateObject(state, {
		error: action.error
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_FILTER_VALUES:
			return sendFilterData(state, action)
		case actionTypes.HANDLE_FILTER_ERRORS:
			return handleError(state, action)
		default:
			return state
	}
}

const getFilters = state => state.filters;
const getFiltersData = state => getFilters(state).filtersData;
const getProps = fd => ({ value: fd.id, displayValue: fd.description })
export const getFiltersProps = state => {
	const filtersData = getFiltersData(state);
	return {
		[SEASON]: [{ value: '', displayValue: 'Season' }, ...filtersData[SEASON].map(getProps)],
		[BUSINESS_UNIT]: [{
			value: '',
			displayValue: 'Business Unit'
		}, ...filtersData[BUSINESS_UNIT].map(getProps)],
		[CREATION_CENTER]: [{
			value: '',
			displayValue: 'Creation Center'
		}, ...filtersData[CREATION_CENTER].map(getProps)],
	}
};

export default reducer;
