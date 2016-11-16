import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import events from './ducks/events';
import time from './ducks/time';
import App from './components/App';
import 'rc-slider/assets/index.css';
import './index.css';

const middlewares = [thunk];
const store = createStore(
  combineReducers({
    events,
    time,
  }),
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
