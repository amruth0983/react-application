import * as types from '../actions/action-types';

const basketMaterials = {}

export default function materialsReducer(state = basketMaterials, action) {
	switch (action.type) {
		case types.BASKETS_LOADED:
			var newBasketMaterials = {};
			action
				.baskets
				.forEach(basket => {
					newBasketMaterials[basket.basketid] = {
						basketid: basket.basketid,
						materialsLoaded: false,
						materialsIsLoading: false,
						materialGroups: [],
						clusters: []
					}
				});
			return newBasketMaterials;
		case types.MATERIALS_LOADED:
			//Materials by Technology
			var materialsByTypeHash = {};
			var materialGroups = [];
			if (action.basketMaterials && action.basketMaterials.length > 0) {
				action.basketMaterials.forEach(material => {
					var material_type = material['material_type']
					if (!(material_type in materialsByTypeHash)) {
						var index = materialGroups.push({
							material_type: material_type,
							materials: []
						}) - 1;
						materialsByTypeHash[material_type] = index;
					}
					materialGroups[materialsByTypeHash[material_type]]
						.materials
						.push(material);
				});
			}

			//Clusters
			var clusters = [];
			action.clusters.forEach(cluster => {
				clusters.push({
					clusterLoaded: false,
					clusterIsLoading: false,
					materials: [],
					...cluster
				});
			});

			return {
				...state,
				[action.basketid]: {
					...state[action.basketid],
					materialsIsLoading: false,
					materialsLoaded: true,
					materialGroups,
					clusters
				}
			}
		case types.LOADING_MATERIALS:
			return {
				...state,
				[action.basketid]: {
					...state[action.basketid],
					materialsIsLoading: true
				}
			}
		case types.LOADING_CLUSTER_MATERIALS:

			var updatedCluster = state[action.basketid]
				.clusters
				.map((item, index) => {
					if (index != action.index) {
						return item;
					}
					// Otherwise, this is the one we want - return an updated value
					return {
						...item,
						clusterIsLoading: true
					};
				});

			return {
				...state,
				[action.basketid]: {
					...state[action.basketid],
					clusters: updatedCluster
				}
			}
		case types.CLUSTER_MATERIALS_LOADED:

			var updatedCluster = state[action.basketid]
				.clusters
				.map((item, index) => {
					if (index != action.index) {
						return item;
					}

					console.log(action.clusterMaterials);
					// Otherwise, this is the one we want - return an updated value
					return {
						...item,
						materials: action.clusterMaterials,
						clusterLoaded: true,
						clusterIsLoading: false
					};
				});
			//console.log(updatedCluster);
			return {
				...state,
				[action.basketid]: {
					...state[action.basketid],
					clusters: updatedCluster
				}
			}
		case types.CLOSE_LOADED_CLUSTER:
			var itemCluster = state[action.basketid]
				.clusters
				.map((item, index) => {
					if (index !== action.index) {
						return item;
					}
					if (item.clusterLoaded) {
						item.clusterLoaded = false;
						return {
							...item
						}
					}
					return {
						...item,
						clusterLoaded: false
					}
				})
			return {
				...state,
				[action.basketid]: {
					...state[action.basketid],
					clusters: itemCluster
				}
			}
		case types.CLOSE_LOADED_BASKET:
			return {
				...state,
				[action.basketid]: {
					...state[action.basketid],
					materialsLoaded: false
				}
			}
		case types.ONMATERIALDRAG:
			return {
				...state,
				draggedMaterial: action.material
			}
		default:
			return state
	}
}