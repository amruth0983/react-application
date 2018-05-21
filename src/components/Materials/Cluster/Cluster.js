import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialsList from '../List';
import { getClusterMaterialsAction, closeLoadedCluster } from '../../../store/actions/Baskets';
import AuxHoc from '../../../hoc/Aux-hoc/Aux-hoc';
import CenteredSpin from '../../UI/spinner/centered-spin';
import icons from '../../../assets/icons.css';

class clustersType extends Component {

	state = {
		itemIndex: null,
		loadingMaterials: false,
		clusterClickedArr: []
	}


	getClusterMaterials = (basketid, cluster, index) => {

		if (!cluster.clusterLoaded && !cluster.clusterIsLoading) {
			this.props.getCluster(basketid, cluster.clusterid, index, this.props.searchParams['division']);
		} else {
			this.props.closeLoadedCluster(basketid, cluster.clusterid, index);
		}
	}

	render() {
		let clusterMaterials = <CenteredSpin />;
		let iconClasses = [];

		if (this.props.clusters.length > 0) {
			clusterMaterials = this.props.clusters.map((cluster, key) => (
				<li key={key}>
					<p onClick={() => this.getClusterMaterials(this.props.basketid, cluster, key)}>
						<span className={(cluster.clusterLoaded) ?
							[icons['ds-icon'], icons['ds-icon--arrow-breadcrumb-down']].join(' ') :
							[icons['ds-icon'], icons['ds-icon--arrow-breadcrumb-right']].join(' ')}></span>
						<span>{cluster.clustername}</span>
					</p>
					{(cluster.clusterLoaded) ?
						<MaterialsList
							materials={cluster.materials}
							key={key} />
						: null
					}
				</li>
			));
		} else {
			clusterMaterials = <p>No Clusters found.</p>;
		}
		return (
			<AuxHoc>
				<ul>
					{clusterMaterials}
				</ul>
			</AuxHoc>
		);
	}
}

const mapStateToProps = state => {
	return {
		searchParams: state.baskets.searchParams
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getCluster: (basketid, cluster, index, division) => dispatch(getClusterMaterialsAction(basketid, cluster, index, division)),
		closeLoadedCluster: (basketid, clusterid, index) => dispatch(closeLoadedCluster(basketid, clusterid, index))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(clustersType);