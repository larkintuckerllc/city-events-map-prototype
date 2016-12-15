import { getToday } from '../apis/time';

export const SET_DAY = 'SET_DAY';
// REDUCERS
export default (state = getToday(), action) => {
  switch (action.type) {
    case SET_DAY:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS
export const getDay = state => state.day;
// ACTION CREATORS
export const setDay = value => ({
  type: SET_DAY,
  value,
});
