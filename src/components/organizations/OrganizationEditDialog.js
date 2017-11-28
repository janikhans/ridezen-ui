import React, { Component } from 'react'
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

class OrganizationEditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.organization.name,
      description: this.props.organization.description,
      errors: null,
      open: false
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = (e) => {
    const organization = {
      name: this.state.name,
      descrtipion: this.state.description
    }
    organizationsApi.updateOrganization(this.props.organization.id, organization)
    .then(response => {
      this.props.updateOrganization(response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  resetForm = () => {
    this.setState({
      open: false,
      name: this.props.organization.name,
      description: this.props.organization.description,
      errors: null
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" onClick={this.handleClickOpen}>
          Edit
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Edit your organization.`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Organization Name"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={this.state.description}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default OrganizationEditDialog
