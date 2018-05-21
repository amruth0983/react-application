import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import './index.css';
import './assets/fonts.css';
import './assets/icons.css';
import App from './App';
import allReducers from './store/reducers';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger();

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk, promise, logger)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();