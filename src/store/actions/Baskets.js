import * as types from './action-types';
import {
	getBaskets,
	getBasketMaterials,
	getBasketClusters,
	getClusterMaterials
} from '../../api/api'

export function getBasketsAction(params) {
	return async (dispatch) => {
		try {
			dispatch(loading(true));
			var baskets = await getBaskets(params);
			dispatch(loadedBaskets(baskets));
			dispatch(loading(false));
		} catch (e) {
			dispatch(loading(false));
		}
	}
}

export function basketSearchChanged(searchTerm) {
	return {
		type: types.SEARCH_BASKET_CHANGED,
		searchTerm
	}
}

export function getBasketMaterialsAction(basketid, division) {
	return async (dispatch) => {
		try {
			dispatch(loadingMaterials(basketid));
			var basketMaterials = await getBasketMaterials(basketid, division);
			var clusters = await getBasketClusters(basketid, division);
			dispatch(loadedMaterials(basketid, basketMaterials, clusters));
		} catch (e) {
			dispatch(loading(false));
		}
	}
}

export function getClusterMaterialsAction(basketid, clusterid, index, division) {
	return async (dispatch) => {
		try {
			dispatch(loadingClusterMaterials(basketid, clusterid, index));
			var clusterMaterials = await getClusterMaterials(basketid, clusterid, division);
			dispatch(loadedClusterMaterials(basketid, clusterid, index, clusterMaterials.data));
		} catch (e) {
			dispatch(loading(false));
		}
	}
}

function loadingClusterMaterials(basketid, clusterid, index) {
	return {
		type: types.LOADING_CLUSTER_MATERIALS,
		basketid,
		clusterid,
		index
	}
}

export function loadingMaterials(basketid) {
	return {
		type: types.LOADING_MATERIALS,
		basketid
	};
}

export function loadedClusterMaterials(basketid, clusterid, index, clusterMaterials) {
	return {
		type: types.CLUSTER_MATERIALS_LOADED,
		basketid,
		clusterid,
		index,
		clusterMaterials
	};
}

export function loadedMaterials(basketid, basketMaterials, clusters) {
	return {
		type: types.MATERIALS_LOADED,
		basketid,
		basketMaterials,
		clusters
	};
}

export function loading(loading) {
	return {
		type: types.LOADING,
		loading
	};
}

export function loadedBaskets(baskets) {
	return {
		type: types.BASKETS_LOADED,
		baskets
	};
}


export function closeLoadedCluster(basketid, clusterid, index) {
	return {
		type: types.CLOSE_LOADED_CLUSTER,
		basketid,
		clusterid,
		index
	}
}

export function closeLoadedBasket(basketid) {
	return {
		type: types.CLOSE_LOADED_BASKET,
		basketid
	}
}

export function clearBasketSearch(baskets) {
	return {
		type: types.CLEARSEARCH,
		baskets
	}
}

export function onMaterialDrag(materialid, material) {
	return {
		type: types.ONMATERIALDRAG,
		materialid,
		material
	}
}