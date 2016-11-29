export const SET_TIME = 'SET_TIME';
// REDUCERS
export default (state = 12, action) => {
  switch (action.type) {
    case SET_TIME:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS
export const getTime = state => state.time;
// ACTION CREATORS
export const setTime = value => ({
  type: SET_TIME,
  value,
});
