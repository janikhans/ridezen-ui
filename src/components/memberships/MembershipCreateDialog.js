import React, { Component } from 'react';
import organizationsApi from '../../services/organizations'

import ErrorsContainer from '../shared/ErrorsContainer'

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class MembershipCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      open: false,
      errors: null
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const newMembership = {
      email: this.state.userEmail
    }

    organizationsApi.createOrganizationMembership(this.props.organization.id, newMembership)
    .then(response => {
      this.props.addMembership(response.data)
      this.resetForm()
    })
    .catch(error => {
      console.log(error)
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  updateUser = (user) => {
    this.setState({ userEmail: user.id })
  }

  resetForm = () => {
    this.setState({
      userEmail: '',
      open: false,
      errors: null
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" aria-label="add" onClick={this.handleClickOpen}>
          Add Member
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Want to add a new user to your organization?`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <TextField
              margin="dense"
              name="userEmail"
              label="User Email"
              type="text"
              fullWidth
              value={this.state.userEmail}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default MembershipCreateDialog;
