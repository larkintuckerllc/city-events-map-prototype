import 'babel-polyfill';
import 'bootstrap-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import events from './ducks/events';
import day from './ducks/day';
import hour from './ducks/hour';
import App from './components/App';
import './favicon.ico';
import './index.scss';

const middlewares = [thunk];
const store = createStore(
  combineReducers({
    events,
    day,
    hour,
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
