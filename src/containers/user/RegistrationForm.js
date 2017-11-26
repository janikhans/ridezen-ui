import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose'
import { connect } from 'react-redux'


import ErrorsContainer from '../../components/shared/ErrorsContainer'
import * as userSelectors from '../../store/user/reducer'
import { signUpUser } from '../../store/user/actions'

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

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
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
    this.props.signUpUser(credentials)
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
          <Typography type="headline" component="h3">
            Not a member yet? Register!
          </Typography>
          {this.props.errors && <ErrorsContainer errors={this.props.errors}/>}
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
            Sign Up
          </Button>
        </Paper>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: userSelectors.getErrors(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (credentials) => dispatch(signUpUser(credentials))
  };
};

export default
    compose(
      withStyles(styles, {
        withTheme: true
      }),
      connect(mapStateToProps, mapDispatchToProps)
  )(RegistrationForm)
