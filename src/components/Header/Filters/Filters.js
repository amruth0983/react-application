import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuxHoc from '../../../hoc/Aux-hoc/Aux-hoc';
import Input from '../../UI/Input/Input';
import classes from './Filters.css';
import * as actions from '../../../store/actions/index';
import { getFiltersProps } from '../../../store/reducers/Filters';
import { SEASON, BUSINESS_UNIT, CREATION_CENTER } from '../../../utility/constants';
import axios from '../../../axios-instance';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Filters extends Component {

	state = {
		filterSelection: {
			'season': {
				value: ''
			},
			'businessunit': {
				value : '' 
			},
			'creationcenter': {
				value : '' 
			},
			'division': {
				value: ''
			},
			'sortorder': {
				value: ''
			},
			'sortby': {
				value: ''
			}
		},
		sortOptions: {
			division: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'footwear', displayValue: 'Footwear'},
						{value: 'apparel', displayValue: 'Apparel'}
					]
				},
				value: ''
			},
			sortorder: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'desc', displayValue: 'Descending'},
						{value: 'asc', displayValue: 'Aescending'}
					]
				},
				value: ''
			},
			sortby: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'created', displayValue: 'Created'},
						{value: 'basketname', displayValue: 'Basket name'},
						{value: 'creator', displayValue: 'Creator'},
						{value: 'season', displayValue: 'Season'},
						{value: 'updated', displayValue: 'Updated'}
					]
				},
				value: ''
			}
		}
	}

	componentDidMount() {
		if (this.props.userDetails && this.props.userDetails !== undefined) {
			this.props.getFilterValues(SEASON);
			this.props.getFilterValues(BUSINESS_UNIT);
			this.props.getFilterValues(CREATION_CENTER);
		}
	}

	setInputVal = (event, controlName, data) => {
		const filterArr = this.state.filterSelection;
		Object.keys(data).map((key) => {
			if (controlName === key) {
				filterArr[key].value = '';
				filterArr[key].value = event.target.value;
			}
			return filterArr;
		});
		this.setState({filterSelection:filterArr});
	}

	inputChangedHandler = (event, controlName) => {
		this.setInputVal(event, controlName, this.props.filtersArr);
		let filterName = controlName + 'id';
		this.props.searchParams[filterName] = event.target.value;
		this.props.getBasketsAction(this.props.searchParams);
	}

	inputSortChangedHandler = (event, controlName) => {
		this.setInputVal(event, controlName, this.state.sortOptions);
		this.props.searchParams[controlName] = event.target.value;
		this.props.getBasketsAction(this.props.searchParams);
	}


	renderFilterInputs = () => {
		const { filtersArr } = this.props;
		const selectedValue = this.state.filterSelection;
		return Object.keys(filtersArr).map((key) => {
			const elementConfig = { options: filtersArr[key] }
			return <Input
				key={key}
				elementType={'select'}
				elementConfig={elementConfig}
				value={selectedValue[key].value}
				changed={(event) => this.inputChangedHandler(event, key)} />
		})
	}

	renderSortInputs = () => {
		const sortObj = this.state.sortOptions;
		const selectedValue = this.state.filterSelection;
		return Object.keys(sortObj).map((key) => {
			const elementConfig = { options: sortObj[key].elementConfig.options }
			return <Input
				key={key}
				elementType={'select'}
				elementConfig={elementConfig}
				value={selectedValue[key].value}
				changed={(event) => this.inputSortChangedHandler(event, key)} />
		})
	}

	render() {
		return (
			<AuxHoc>
				<div className={classes['filters-container']}>
					<h4>Filters:</h4>
					<div className={classes['filters-block']}>
						{this.renderFilterInputs()}
					</div>
					<hr />
					<div className={classes['sort-options']}>
						{this.renderSortInputs()}
					</div>
				</div>
			</AuxHoc>
		);
	}

}

const mapStateToProps = state => {
	return {
		loading: state.baskets.loading,
		filtersArr: getFiltersProps(state),
		error: state.filters.error,
		searchParams: state.baskets.searchParams,
		userDetails: state.auth.userDetails
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFilterValues: (filterName) => dispatch(actions.suggestFilter(filterName)),
		getBasketsAction: (params) => dispatch(actions.getBasketsAction(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Filters, axios))
