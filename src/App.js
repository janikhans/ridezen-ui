import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

import * as userSelectors from './store/user/reducer'
import { verifyToken } from './store/user/actions'

import Member from './containers/layout/Member'
import Guest from './containers/layout/Guest'

var Spinner = require('react-spinkit');

class App extends Component {
  componentDidMount() {
    this.props.verifyToken()
  }

  render() {
    const classes = {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column'
      },
      heading: {
        marginBottom: '35px'
      }
    }
    if (this.props.isVerifying) {
      return (
        <div style={classes.container}>
          <h3 style={classes.heading}>Ridezen Loading...</h3>
          <Spinner name="ball-clip-rotate-multiple" fadeIn="half"/>
        </div>
      )
    }

    return (
      this.props.userLoggedIn ? <Member /> : <Guest />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isVerifying: userSelectors.isVerifying(state),
    userLoggedIn: userSelectors.isUserLoggedIn(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
