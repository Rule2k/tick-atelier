import React from 'react';

import MainBottom from 'src/containers/Home/MainBottom';
import MainTop from 'src/containers/Home/MainTop';

import './main.scss';

const Main = () => (
  <div id="main">
    <MainTop />
    <MainBottom />
  </div>
);

export default Main;
