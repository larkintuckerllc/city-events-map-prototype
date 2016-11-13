# City Events Map Prototype

## Lesson 6

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

Now that we have been introduced to all core concepts of the React / Redux
framework, we will begin to build out the "City Events Map Prototype"
application.

The application is designed to display city events (from an API) on a map
filtered by location and time. This lesson will focus on the getting
the data from the API into the Redux store.

**Assignment (5 Min): Simplify the "App" component to be a simple
"hello world" by editing the "App.js" file in "src" to be:***

```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}
export default App;
```

The first step is to provide a mock API and a way to access it.

**Assignment (5 Min): Working from the solution from *Lesson 4* create
a folder called "apis" in the "src" folder with a file named "events.js"
in it with:**

```
const fakeDatabase = {
  collection: [{
    id: 0,
    name: 'Code for Gainesville',
    lat: 29.649062,
    lng: -82.331487,
  }, {
    id: 1,
    name: 'Infinity Hall Event',
    lat: 29.650661,
    lng: -82.334829,
  }],
};
const delay = (ms) =>
  new Promise(resolve => window.setTimeout(resolve, ms));
// eslint-disable-next-line
export const getEvents = () =>
  delay(2000).then(() =>
    fakeDatabase.collection.map(o => ({ ...o }))
  );
```

With the API in place, we will build the Redux reducers, accessors, and
action creators that interact with the API.

**Assignment (5 Min): In the *solution* folder enter the commands:**

`npm install --save normalizr`

`npm install --save redux-thunk`

**note:** These modules are helpful with handling asynchronous APIs
that return arrays.

**Assignment (5 Min): Create a folder called "ducks" in the "src" folder
with a file named "events.js" in it with:**

**note:** While this file is much like the *counter.js* in the previous
lesson, it is somewhat more complicated. At this point, we will focus on
how to use this file rather than the details of the implementation.

```
import { combineReducers } from 'redux';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as fromEvents from '../apis/events';

function ServerException(message) {
  this.name = 'ServerException';
  this.message = message;
}
const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
const eventSchema = new Schema('events');
const eventsSchema = arrayOf(eventSchema);
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS: {
      return action.response.entities.events;
    }
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.response.result;
    default:
      return state;
  }
};
const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return true;
    case FETCH_EVENTS_SUCCESS:
    case FETCH_EVENTS_ERROR:
      return false;
    default:
      return state;
  }
};
const fetchErrorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_EVENTS_ERROR:
      return action.message;
    case FETCH_EVENTS_REQUEST:
    case FETCH_EVENTS_SUCCESS:
      return null;
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
  isFetching,
  fetchErrorMessage,
});
// ACCESSORS
export const getEvent = (state, id) => state.byId[id];
export const getEvents = (state) =>
  state.ids.map(id => getEvent(state, id));
export const getIsFetchingEvents = (state) => state.isFetching;
export const getFetchEventsErrorMessage = (state) =>
  state.fetchErrorMessage;
// ACTION CREATORS
export const fetchEvents = () => (dispatch, getState) => {
  if (getIsFetchingEvents(getState())) throw new Error();
  dispatch({
    type: FETCH_EVENTS_REQUEST,
  });
  return fromEvents.getEvents()
    .then(
      response => dispatch({
        type: FETCH_EVENTS_SUCCESS,
        response: normalize(response, eventsSchema),
      }),
      error => {
        dispatch({
          type: FETCH_EVENTS_ERROR,
          message: error.message,
        });
        throw new ServerException(error.message);
      }
    );
};
```

**Assignment (5 Min): Use the created *events.js* file by
editing the "index.js" file in the "src" folder as follows:***

Add the following to the imports at the top:

```
import thunk from 'redux-thunk';
```

Replace..

```
import counter from './counter';
```

with

```
import events from './ducks/events';
```

Add `thunk` to the `middlewares` array.

**note:** The *thunk* middleware allows one to create more complex
action creators that do more than simply returning a single action
object, e.g, *fetchEvents*.

Replace `counter` with `events` as the first parameter to `createStore`.

**Assignment (5 Min): Delete the unused file "counter.js" in the "src"
folder**

At this point, the app still just displays *Hello World*, but using
*Redux DevTools* one can see that the store is initialized with
information about events (until we fetch the events, however, the information
indicates no events).

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

Run the following command in the *solution* folder to download the
dependencies:

`npm install`

### Usage

To run the solution, use the command in the *solution* folder to build
and serve the application:

`npm run start`

and open web browser to the provided URL.
