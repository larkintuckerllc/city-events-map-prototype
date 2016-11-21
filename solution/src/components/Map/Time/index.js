import React from 'react';
import './index.css';

export default ({ setTime, time }) => {
  return (
    <div id="map_root__time">
      <input
        id="map_root__time__range"
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
