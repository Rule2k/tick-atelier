import React from 'react';
import { Breakpoint } from 'react-socks';


const Logo = () => (
  <div>
    <Breakpoint medium down>
      <div id="header-mobile-top-logo">
          <span id="header-mobile-top-logo-span">Tick'Ateliers</span>
      </div>
    </Breakpoint>
    <Breakpoint large up>
      <div id="header-top-logo">
        <span id="header-top-logo-span">Tick'Ateliers</span>
      </div>
    </Breakpoint>
  </div>
);
export default Logo;
