import React from 'react';
import { Breakpoint } from 'react-socks';

import FooterItems from './FooterItems';

import './footer.scss';

const Footer = () => (
  <div>
    <Breakpoint medium down>
      <div id="footer">
        <FooterItems />
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div id="footer">
        <FooterItems />
      </div>
    </Breakpoint>
  </div>
);

export default Footer;
