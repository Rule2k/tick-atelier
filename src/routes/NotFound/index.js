import React from 'react';
import { Breakpoint } from 'react-socks';
import { Link } from 'react-router-dom';

import Footer from 'src/components/Footer';
import Notifications from 'src/containers/Home/Notifications';
import SearchForm from 'src/containers/Home/SearchForm';
import LogOut from 'src/containers/Home/LogOut';
import Logo from './Logo';

import './notfound.scss';

const NotFound = () => (
  <div>
    <Breakpoint medium down>
      <div id="home">
        <div id="header-mobile">
          <div id="header-mobile-top">
            <Link to="/">
              <Logo />
            </Link>
            <LogOut />
          </div>
        </div>
        <Footer />
      </div>
    </Breakpoint>

    <Breakpoint large up>
      <div id="home">
        <div id="header">
          <div id="header-top">
            <Link to="/">
              <Logo />
            </Link>
            <SearchForm />
            <Notifications />
            <LogOut />
          </div>
        </div>
        <div id="main-404">
          <p id="main-404-title">
            404 !!!!
          </p>
          <p id="main-404-desc">
            HAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa......
          </p>
          <p id="main-404-desc">
            Peut-être faudrait-il ouvrir un ticket quelque part... Mais où ? Si seulement il existait un site pour faire des tickets. Sûrement une idée pour les futures promos...
          </p>
          <Link to="/">
            <p id="main-404-desc">
                En attendant que ce jour arrive, tu peux aussi retourner à l'accueil...
            </p>
          </Link>
        </div>
        <Footer />
      </div>
    </Breakpoint>
  </div>
);

export default NotFound;
