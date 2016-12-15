import React, { PropTypes } from 'react';
import style from './index.scss';

const Display = ({ hour }) => {
  let clockHour;
  if (hour === 0) {
    clockHour = 12;
  } else if (hour < 13) {
    clockHour = hour;
  } else {
    clockHour = hour - 12;
  }
  const period = hour < 12 ? 'AM' : 'PM';
  return <div id={style.root}>{clockHour} {period}</div>;
};
Display.propTypes = {
  hour: PropTypes.number.isRequired,
};
export default Display;
