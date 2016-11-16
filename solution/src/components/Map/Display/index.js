import React from 'react';
import './index.css';

export default ({ time }) => {
  const hour = time === 0 ? 12 : (time < 13 ? time : time - 12);
  const period = time < 12 ? 'AM' : 'PM';
  return <div id="map_root__display">{hour} {period}</div>;
};
