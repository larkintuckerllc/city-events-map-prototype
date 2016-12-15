// eslint-disable-next-line
export const getToday = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), 11, 15, 0, 0, 0, 0);
  return today.getTime();
};
export const getCurrentHour = () => (new Date()).getHours();
