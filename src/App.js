import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

import * as userSelectors from './store/user/reducer'

import Member from './containers/layout/Member'
import Guest from './containers/layout/Guest'

class App extends Component {
  render() {
    return (
      this.props.userLoggedIn ? <Member /> : <Guest />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: userSelectors.isUserLoggedIn(state)
  };
};

export default withRouter(connect(mapStateToProps)(App));
