import React, { Component } from 'react';
import { Link, Route, withRouter } from "react-router-dom";
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import Background from '../../images/guestBG2.jpg';

import Splash from '../../views/Splash'
import LoginForm from '../../containers/user/LoginForm'
import RegistrationForm from '../../containers/user/RegistrationForm'

import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    background: `url(${Background}) no-repeat center`,
    display: 'flex',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    fontSize: '6rem',
    fontWeight: 'bold',
    lineHeight: '80px',
    marginBottom: '15px'
  },
  subHeading: {
    marginBottom: '-10px',
    fontSize: '1.2rem',
    color: 'white',
    lineHeight: '80px'
  },
  links: {
    marginTop: 25
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
});

class Guest extends Component {
  componentDidMount() {
    this.props.signInRedirect()
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className={classes.heading}>Start TrackR</h1>
        <p className={classes.subHeading}>A better way to track things!</p>
        <Route exact path="/" component={Splash} />
        <Route exact path="/sign_in" component={LoginForm} />
        <Route exact path="/sign_up" component={RegistrationForm} />
        <div className={classes.links}>
          <Link to="/sign_in" className={classes.link} >Sign In</Link> <Link to="/sign_up" className={classes.link} >Sign Up</Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInRedirect: () => dispatch(push('/sign_in'))
  };
};

export default withRouter(compose(withStyles(styles), connect(null, mapDispatchToProps))(Guest));
