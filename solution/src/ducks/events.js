import { combineReducers } from 'redux';
import { normalize, Schema, arrayOf } from 'normalizr';
import { createSelector } from 'reselect';
import * as fromMeetupEvents from '../apis/meetupEvents';
import { ServerException } from '../util/exceptions';

const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
const ADD_EVENTS = 'ADD_EVENTS';
// SCHEMA
const eventSchema = new Schema('events');
const eventsSchema = arrayOf(eventSchema);
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENTS: {
      return {
        ...state,
        ...action.response.entities.events,
      };
    }
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case ADD_EVENTS:
      return [...state, ...action.response.result];
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
const getEventsIds = state => state.events.ids;
const getEventsById = state => state.events.byId;
export const getEvents = createSelector(
  [getEventsIds, getEventsById],
  (eventsIds, eventsById) => eventsIds.map(id => eventsById[id]),
);
export const getIsFetchingEvents = state => state.events.isFetching;
export const getFetchEventsErrorMessage = state =>
  state.events.fetchErrorMessage;
// ACTION CREATORS
export const fetchEvents = () => (dispatch, getState) => {
  if (getIsFetchingEvents(getState())) throw new Error();
  dispatch({
    type: FETCH_EVENTS_REQUEST,
  });
  return Promise.all([
    fromMeetupEvents.getMeetupEvents(),
  ])
    .then(
      (responses) => {
        for (let i = 0; i < responses.length; i += 1) {
          dispatch({
            type: ADD_EVENTS,
            response: normalize(responses[0], eventsSchema),
          });
        }
        dispatch({
          type: FETCH_EVENTS_SUCCESS,
        });
      },
      (error) => {
        dispatch({
          type: FETCH_EVENTS_ERROR,
          message: error.message,
        });
        throw new ServerException(error.message);
      },
    );
};
