import 'babel-polyfill';
import 'bootstrap-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import events from './ducks/events';
import time from './ducks/time';
import dummy from './ducks/dummy';
import App from './components/App';
import './favicon.ico';
import './index.scss';

// SAMPLE DEVELOPMENT DEBUGGING CODE
if (process.env.NODE_ENV !== 'production') {
  window.console.log('DEVELOPMENT ENVIRONMENT');
}
const middlewares = [thunk];
const store = createStore(
  combineReducers({
    events,
    time,
    dummy,
  }),
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
