import axios from 'axios';

const userData = localStorage.getItem('userDetails');
const auth = "Basic " + btoa(atob(userData));
const instance = axios.create({
    baseURL: 'http://designportal-sit.adidas-group.com/api',
    headers: {'Authorization': auth}
});

export default instance;