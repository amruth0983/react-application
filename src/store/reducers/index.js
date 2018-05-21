import {combineReducers} from 'redux';
import BasketReducer from './Baskets';
import MaterialReducer from './Materials';
import AuthReducer from './Auth';
import FilterReducer from './Filters';
import SettingsReducer from './Settings';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({baskets: BasketReducer, materials: MaterialReducer, 
  auth: AuthReducer, filters: FilterReducer, settings: SettingsReducer});

export default allReducers