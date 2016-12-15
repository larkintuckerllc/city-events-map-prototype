import React, { PropTypes } from 'react';
import styles from './index.scss';

const Time = ({ setHour, hour }) => (
  <div id={styles.root}>
    <input
      id={styles.rootRange}
      type="range"
      min="0"
      max="23"
      step="1"
      value={hour.toString()}
      onChange={(e) => {
        setHour(parseInt(e.target.value, 10));
      }}
    />
  </div>
);
Time.propTypes = {
  setHour: PropTypes.func.isRequired,
  hour: PropTypes.number.isRequired,
};
export default Time;
