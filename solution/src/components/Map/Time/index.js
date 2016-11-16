import React from 'react';
import Rcslider from 'rc-slider';
import './index.css';

export default ({ setTime, time }) => {
  return (
    <div id="map_root__time">
      <Rcslider
        min={0}
        max={23}
        onChange={setTime}
        vertical={true}
        value={time}
      />
    </div>
  );
};
