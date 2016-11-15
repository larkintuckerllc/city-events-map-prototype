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
export const getEvent = (state, id) => state.events.byId[id];
export const getEvents = (state) =>
  state.events.ids.map(id => getEvent(state, id));
export const getIsFetchingEvents = (state) => state.events.isFetching;
export const getFetchEventsErrorMessage = (state) =>
  state.events.fetchErrorMessage;
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
