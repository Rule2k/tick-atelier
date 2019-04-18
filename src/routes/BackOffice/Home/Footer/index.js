import React from 'react';

import FooterItems from './FooterItems';
import Pages from './Pages';

import './footer.scss';

const Footer = () => (
  <div id="footer-backoffice">
    <Pages />
    <FooterItems />
  </div>
);

export default Footer;
