import React from 'react';
import style from './index.scss';

export default ({ time }) => {
  const hour = time === 0 ? 12 : (time < 13 ? time : time - 12);
  const period = time < 12 ? 'AM' : 'PM';
  return <div id={style.root}>{hour} {period}</div>;
};
