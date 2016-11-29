import React, { PropTypes } from 'react';
import styles from './index.scss';

const Time = ({ setTime, time }) => (
  <div id={styles.root}>
    <input
      id={styles.rootRange}
      type="range"
      min="0"
      max="23"
      step="1"
      value={time.toString()}
      onChange={(e) => {
        setTime(parseInt(e.target.value, 10));
      }}
    />
  </div>
);
Time.propTypes = {
  setTime: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
export default Time;
