import React, { Component } from 'react';

import ErrorsContainer from '../shared/ErrorsContainer'
import serviceItemsApi from '../../services/serviceItems'

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class ServiceItemCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
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
    const serviceItem = {
      name: this.state.name
    }

    serviceItemsApi.createServiceItem(serviceItem)
    .then(response => {
      this.props.addServiceItem(response.data)
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
      name: '',
      errors: null
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Add Service Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Add new service item.`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={this.state.name}
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

export default ServiceItemCreateDialog
