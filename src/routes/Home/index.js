import React from 'react';
import { Breakpoint } from 'react-socks';
import { store } from 'src/store';

import Footer from 'src/components/Footer';
import Header from 'src/containers/Home/Header';
import { checkUserLoggedInHome } from 'src/store/reducers/login-user-reducer';
import Main from './Main';

class Home extends React.Component {
  componentDidMount() {
    store.dispatch(checkUserLoggedInHome());
  }

  render() {
    return (
      <div>
        <Breakpoint medium down>
          <div id="home">
            <Header />
            <Main />
            <Footer />
          </div>
        </Breakpoint>

        <Breakpoint large up>
          <div id="home">
            <Header />
            <Main />
            <Footer />
          </div>
        </Breakpoint>
      </div>
    );
  }
}


export default Home;
