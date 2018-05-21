import * as actionTypes from './action-types';
import {getSelectedFilterValues} from '../../api/api';

export const suggestFilter = (filterName) => {
	return async (dispatch) =>{
		try {
			const filterData = await getSelectedFilterValues(filterName);
			dispatch(getFilterData(filterData, filterName));
		} catch (e) {
			dispatch(handleFilterError(e));
		}
	}
}

export const getFilterData = (filterData, filterName) => ({
		type: actionTypes.GET_FILTER_VALUES,
		filterData,
		category: filterName
	})

export const handleFilterError = (error) => {
	return {
		type: actionTypes.HANDLE_FILTER_ERRORS,
		error: error
	}
}