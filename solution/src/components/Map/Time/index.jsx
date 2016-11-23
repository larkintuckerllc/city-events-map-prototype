import React from 'react';
import styles from './index.scss';

export default ({ setTime, time }) => {
  return (
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
};
