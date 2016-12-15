import { getCurrentHour } from '../apis/time';

export const SET_HOUR = 'SET_HOUR';
// REDUCERS
export default (state = getCurrentHour(), action) => {
  switch (action.type) {
    case SET_HOUR:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS
export const getHour = state => state.hour;
// ACTION CREATORS
export const setHour = value => ({
  type: SET_HOUR,
  value,
});
