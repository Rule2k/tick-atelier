import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breakpoint } from 'react-socks';

import Footer from './Footer';
import Logo from './Logo';
import './login.scss';

class Login extends Component {
  // Downloads oauth.js from CDN, pretty much like adding external scripts
  componentDidMount() {
    const oauthScript = document.createElement('script');
    oauthScript.src = 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js';
    document.body.appendChild(oauthScript);
  }

  handleClick(e) {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    // Sign-up an account to get one
    window.OAuth.initialize('5narCAM1yLUEN3no2B8ZeZMZdAc');

    // Popup Github and ask for authorization
    window.OAuth.popup('github').then((provider) => {
      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        const { checkUserLoggedIn } = this.props;
        const { receivedToken } = this.props;
        receivedToken(provider.access_token);
        checkUserLoggedIn(data.alias);
      });

      // You can also call Github's API using .get()
      provider.get('/orgs/TickAtelierTest/members').then((data) => {
      });
    });
  }

  render() {
    return (

      <div className="login-mobile">

        <Breakpoint medium down>
          <div className="login-mobile-container">
            <Logo />
            <div className="login-mobile-container-div">
              <a href="" onClick={this.handleClick.bind(this)} className="login-mobile-container-div-button">
                <span className="fa fa-github" /> Sign in with Github
              </a>
            </div>
            <Footer />
          </div>
        </Breakpoint>

        <Breakpoint large up>
          <Logo />
          <div className="login-container" />
          <div className="login-container-div">
            <a href="" onClick={this.handleClick.bind(this)} className="login-container-div-button">
              <span className="fa fa-github" /> Sign in with Github
            </a>
          </div>
          <Footer />
        </Breakpoint>
      </div>
    );
  }
}

Login.propTypes = {
  checkUserLoggedIn: PropTypes.func.isRequired,
  receivedToken: PropTypes.func.isRequired,
};

export default Login;
