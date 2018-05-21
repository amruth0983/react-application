import axios from '../axios-instance';
const userData = localStorage.getItem('userDetails');
const auth = "Basic " + btoa(atob(userData));
export const getBaskets = (params) => {
	var options = {
			'method': 'get',
			'url': '/material/baskets',
			'params': params,
			'headers': {
				'Authorization': auth
			}
		},
		parsedJSON;

	return axios(options).then(function (response) {
			if (response.data.p_err_code === 'success') {
				parsedJSON = response.data.data;
				return parsedJSON;
			}
		})
		.catch(function (err) {
			return err;
		});
};

export const getBasketDetails = (basketid, division) => {

	var options = {
			'method': 'get',
			'url': '/material/basketdetails',
			'params': {
				basketid: basketid,
				division: division
			},
			'headers': {
				'Authorization': "Basic " + auth
			}
		},
		parsedJSON;

	return axios(options).then(function (response) {
			console.log(response);
			if (response.data.p_err_code === 'success') {
				parsedJSON = response.data.data;
				return parsedJSON;
			}
		})
		.catch(function (err) {
			return err;
		});
};

export const getBasketMaterials = (basketid, division, type = 'all') => {
	var options = {
			'method': 'get',
			'url': '/material/basketmaterials',
			'params': {
				basketid: basketid,
				division: division,
				type: type
			},
			'headers': {
				'Authorization': auth
			}
		},
		parsedJSON;

	return axios(options).then(function (response) {
			if (response.data.p_err_code === 'success') {
				parsedJSON = response.data[type].data;
				return parsedJSON;
			}
		})
		.catch(function (err) {
			return err;
		});
};

export const getBasketClusters = (basketid) => {
	var options = {
			method: 'get',
			url: '/material/basketclusters',
			params: {
				basketid: basketid
			},
			'headers': {
				'Authorization': auth
			}
		},
		parsedJSON;

	return axios(options).then(function (response) {
			if (response.data.p_err_code === 'success') {
				parsedJSON = response.data.clusters;
				return parsedJSON;
			}
		})
		.catch(function (err) {
			return err;
		});
};

export const getClusterMaterials = (basketid, clusterid, division) => {
	var options = {
			method: 'get',
			url: '/material/clustermaterials',
			params: {
				basketid: basketid,
				clusterid: clusterid,
				division: division
			},
			'headers': {
				'Authorization': auth
			}
		},
		parsedJSON;

	return axios(options).then(function (response) {
			if (response.data.p_err_code === 'success') {
				parsedJSON = response.data.clusters;
				return parsedJSON;
			}
		})
		.catch(function (err) {
			return err;
		});
};

export const authenticateUser = (username, password) => {
	var parsedJSON;

	return axios({
			'url': '/user/profile',
			'method': 'get',
			'headers': {
				'Authorization': "Basic " + btoa(username + ':' + password)
			}
		}).then(function (response) {
			if (response !== undefined && response.data.p_err_code === 'success') {
				console.log(response);
				parsedJSON = response.data.user;
				return parsedJSON;
			}
		})
		.catch(function (error) {
			console.log(error);
			return error;
		});
};

export const getSelectedFilterValues = (filterName) => {
	var options = {
			method: 'get',
			url: '/material/masterdata',
			params: {
				category: filterName
			},
			'headers': {
				'Authorization': auth
			}
		},
		parsedJSON;

	return axios(options).then(function (response) {
			if (response.data.p_err_code === 'success') {
				parsedJSON = response.data.units;
				return parsedJSON;
			}
		})
		.catch(function (err) {
			return err;
		});
};