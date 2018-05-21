import * as types from '../actions/action-types';
import { updateObject } from '../../utility/utility';

const baskets = {
	allBaskets: [],
	filteredBaskets: [],
	basketSearchTerm: null,
	loading: true,
	error: null,
	searchParams: {
		baskettype: 'my',
		division: 'footwear',
		ismodular: false,
		isofficial: false,
		limit: '35',
		offset: '0',
		sortby: 'created',
		sortorder: 'desc'
	}
}

const basketsLoaded = (state, action) => {
	if (action.baskets === undefined) {
		return state;
	}

	return updateObject(state, {
		allBaskets: action.baskets,
		filteredBaskets: action.baskets,
		loading: false
	});
}

const searchBasket = (state, action) => {
	var filteredBaskets = state
		.allBaskets
		.filter(item => item.basketname.toUpperCase().includes(action.searchTerm.toUpperCase()));

	return updateObject(state, {
		filteredBaskets,
		basketSearchTerm: action.searchTerm === '' ? null : action.searchTerm
	})
}

const clearBasketSearch = (state, action) => {
	console.log(action);
	return updateObject(state, {
		allBaskets: action.baskets,
		filteredBaskets: action.baskets
	})
}

const basketReducer = (state = baskets, action) => {
	switch (action.type) {
		case types.BASKETS_LOADED:
			return basketsLoaded(state, action);
		case types.SEARCH_BASKET_CHANGED:
			return searchBasket(state, action);
		case types.CLEARSEARCH:
			return clearBasketSearch(state, action);
		default:
			return state;
	}
}

export default basketReducer;