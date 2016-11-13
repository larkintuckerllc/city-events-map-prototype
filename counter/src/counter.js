// REDUCER
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};
// ACCESSOR
export const getCounter = (state) => state;
// ACTION CREATOR
export const increment = () => ({
  type: 'INCREMENT'
});
