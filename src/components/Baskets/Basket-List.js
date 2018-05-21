import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CenteredSpin from '../UI/spinner/centered-spin';
import { getBasketsAction, getBasketMaterialsAction, getClusterMaterialsAction, closeLoadedBasket } from '../../store/actions/Baskets';
import Basket from './Basket';
import AuxHoc from '../../hoc/Aux-hoc/Aux-hoc';
import classes from './Basket.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-instance';

const styles = {
	basketPanelStyle: {
		background: '#f7f7f7',
		borderRadius: 0,
		border: 1,
		overflow: 'hidden'
	},
	groupPanelStyle: {
		background: '#f7f7f7',
		borderRadius: 0,
		border: 1,
		overflow: 'hidden'
	}
}
class BasketList extends Component {

	componentDidMount() {
		if (Object.keys(this.props.materials).length === 0) {
			this.props.getBasketsAction(this.props.searchParams);
		}
	}

	basketClicked(basketid, basketMaterials, getBasketMaterials) {
		if (basketid === undefined) {
			return;
		}
		if (!basketMaterials.materialsLoaded) {
			getBasketMaterials(basketid, this.props.searchParams['division'], 'all');
		} else {
			this.props.closeLoadedBasket(basketid);
		}
	}

	render() {
		let basketList = <CenteredSpin />;
		const basketMaterials = this.props.materials;
		const clusterAction = this.props.getClusterMaterialsAction;
		if (!this.props.loading) {
			if (this.props.baskets.length > 0) {
				basketList = this.props.baskets.map((basket, i) => (
					<Basket
						basket={basket}
						key={i}
						materials={basketMaterials[basket.basketid]}
						clicked={() => this.basketClicked(basket.basketid, basketMaterials[basket.basketid],
							this.props.getBasketMaterialsAction)}/>
				));
			} else {
				basketList = <p>No baskets found. Please refine your search.</p>;
			}
		}
		return (
			<AuxHoc>
				<div className={classes.basketContainer}>
					<ul>
						{!basketMaterials.materialsLoaded ? basketList : null}
					</ul>
				</div>
			</AuxHoc>
		);
	}
}

function mapStateToProps(state) {
	return {
		baskets: state.baskets.filteredBaskets,
		materials: state.materials,
		loading: state.baskets.loading,
		searchParams: state.baskets.searchParams
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getBasketsAction,
		getBasketMaterialsAction,
		getClusterMaterialsAction,
		closeLoadedBasket
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withErrorHandler(BasketList, axios));