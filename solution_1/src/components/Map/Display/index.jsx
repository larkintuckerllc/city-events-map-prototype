import React, { PropTypes } from 'react';
import style from './index.scss';

const Display = ({ time }) => {
  let hour;
  if (time === 0) {
    hour = 12;
  } else if (time < 13) {
    hour = time;
  } else {
    hour = time - 12;
  }
  const period = time < 12 ? 'AM' : 'PM';
  return <div id={style.root}>{hour} {period}</div>;
};
Display.propTypes = {
  time: PropTypes.number.isRequired,
};
export default Display;
