import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from './Header.css';
import input from '../UI/Input/Input.css';
import icons from '../../assets/icons.css';
import Filters from './Filters/Filters';
import Auxhoc from '../../hoc/Aux-hoc/Aux-hoc';
import Input from '../UI/Input/Input';
import * as actions from '../../store/actions/index';
import { updateObject } from '../../utility/utility';

class AppHeader extends Component {

	state = {
		controls: {
			basketFilter: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'my', displayValue: 'My' },
						{ value: 'follow', displayValue: 'Follow' },
						{ value: 'official', displayValue: 'Official' },
						{ value: 'all', displayValue: 'All' }
					]
				},
				value: 'my',
				validation: {},
				valid: true
			}
		},
		inputSearch: ''
	};

	inputChangedHandler = (event) => {

		const updatedFormElement = updateObject(this.state.controls.basketFilter, {
			value: event.target.value
		});

		const updatedOrderForm = updateObject(this.state.controls, {
			'basketFilter': updatedFormElement
		});

		this.setState({ controls: updatedOrderForm });
		this.props.searchParams['baskettype'] = event.target.value;
		this.props.getBasketsAction(this.props.searchParams);
	}

	inputSearchHandler = (event) => {
		this.setState({inputSearch: event.target.value});
		this.props.searchParams['search'] = event.target.value;
		this.props.basketSearchChanged(this.state.inputSearch);
	}

	clearSearch = () => {
		this.setState({inputSearch: ''});
		this.props.clearBasketSearch(this.props.baskets);
	}

	openSettings = () => {
		this.props.history.push('/settings');
	}

	render() {
		let basketFilterDrop = (<Input
			elementType={this.state.controls.basketFilter.elementType}
			elementConfig={this.state.controls.basketFilter.elementConfig}
			value={this.state.controls.basketFilter.value}
			invalid={!this.state.controls.basketFilter.valid}
			shouldValidate={this.state.controls.basketFilter.validation}
			changed={(event) => this.inputChangedHandler(event)}
			customClass='basket-type' />);

		return (
			<Auxhoc>
				<header className={classes.Header}>
					<div className={classes['basket-options']}>
						<div className={classes['basket-filter']}>
							{basketFilterDrop}
						</div>
						<div className={classes['basket-search']}>
							<input placeholder="Search basket name" value={this.state.inputSearch} onChange={(event) => this.inputSearchHandler(event)} />
							{(this.state.inputSearch) ? 
								<span className={[icons['ds-icon'], icons['ds-icon--close-small']].join(' ')} 
									onClick={() => this.clearSearch()}></span>
								: null }
						</div>
						<div className={classes.Operations}>
							<span className={[icons['ds-icon'], icons['ds-icon--sync']].join(' ')}></span>
							<span className={[icons['ds-icon'], icons['ds-icon--settings']].join(' ')} onClick={this.openSettings}></span>
						</div>
					</div>
					<Filters />
				</header>
			</Auxhoc>
		);
	}
}

const mapStateToProps = state => {
	return {
		basketSearchTerm: state.baskets.basketSearchTerm,
		searchParams: state.baskets.searchParams,
		baskets: state.baskets.allBaskets
	}
}

const mapDispatchToProps = dispatch => {
	return {
		basketSearchChanged: (searchTerm) => dispatch(actions.basketSearchChanged(searchTerm)),
		getBasketsAction: (params) => dispatch(actions.getBasketsAction(params)),
		clearBasketSearch: (baskets) => dispatch(actions.clearBasketSearch(baskets))
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));