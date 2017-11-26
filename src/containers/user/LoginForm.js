import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import _ from 'lodash'


import ErrorsContainer from '../../components/shared/ErrorsContainer'
import * as userSelectors from '../../store/user/reducer'
import { loginUser } from '../../store/user/actions'

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.email,
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(credentials)
    e.preventDefault();
  }

  renderMessage(message) {
    return (
      <div>{message}</div>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          {_.map(this.props.messages, this.renderMessage.bind(this))}
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="text"
            fullWidth
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button raised onClick={this.handleSubmit} color="primary">
            Login
          </Button>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    messages: userSelectors.getMessages(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (credentials) => dispatch(loginUser(credentials))
  };
};

export default
    compose(
      withStyles(styles, {
        withTheme: true
      }),
      connect(mapStateToProps, mapDispatchToProps)
  )(LoginForm)