import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../utility/utility';
import { FOOTWEAR, APPAREL } from '../../utility/constants';

const initialState = {
	divisionAttrs: {
		footwear : {
			'attrList': []
		},
		apparel:{
			'fabric': {
				'attrList': []
			},
			'trim': {
				'attrList': []
			}
		}
	},
	lineBreakSelection: {
		'footwear': {
			value: ''
		},
		'apparel': {
			'fabric': {
				value: ''
			},
			'trims': {
				value: ''
			}
		}
	}
};

const loopApparelData = (data) => {
	const emptyObj = {
		'value': '',
		'displayValue': 'none'
	};

	// Loop through the fabric and trim and add unchecked value
	const apparelTypeData = {
		'fabric': [emptyObj, ...data['fabrics'].map((item, key) => {
			if (item.isChecked) {
				item.isChecked = !item.isChecked;
			}
			return item;
		})],
		'trims': [emptyObj, ...data['trims'].map((item, key) => {
			if (item.isChecked) {
				item.isChecked = !item.isChecked;
			}
			return item;
		})]
	};
	const apparelDivisionObj = {
		'attrList': apparelTypeData
	}
	return apparelDivisionObj;
}

const loopFootwearData = (data, isUpdate) => {
	let updateAttrList = '';
	const emptyObj = {
		'value': '',
		'displayValue': 'none'
	};

	updateAttrList = [emptyObj, ...data.map((item, key) => {
		if (!item.isChecked && isUpdate) {
			item.isChecked = !item.isChecked;
		}
		return item;
	})];

	if (!isUpdate) {
		console.log(updateAttrList);
	}

	const footwearDivisionObj = {
		'attrList': updateAttrList
	}
	return footwearDivisionObj;
}

const sendDivisionAttrs = (state, action) => {
	return updateObject(state, {
		divisionAttrs: {
			'footwear': loopFootwearData(FOOTWEAR, true),
			'apparel': loopApparelData(APPAREL)
		}
	});
}

const updateDivisionAttrs = (state, action) => {
	console.log(action.attrs);
	return updateObject(state, {
		divisionAttrs: {
			'footwear': loopFootwearData(action.attrs, false),
			'apparel': loopApparelData(APPAREL)
		}
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_DIVISION_ATTRIBUTES:
			return sendDivisionAttrs(state, action)
		case actionTypes.SET_DIVISION_ATTRIBUTES:
			return updateDivisionAttrs(state, action)
		default:
			return state
	}
}

export default reducer;