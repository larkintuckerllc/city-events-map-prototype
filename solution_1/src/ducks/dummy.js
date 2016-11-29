export const SET_DUMMY = 'SET_DUMMY';
// REDUCERS
export default (state = false, action) => {
  switch (action.type) {
    case SET_DUMMY:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS
export const getDummy = state => state.dummy;
// ACTION CREATORS
export const setDummy = value => ({
  type: SET_DUMMY,
  value,
});
