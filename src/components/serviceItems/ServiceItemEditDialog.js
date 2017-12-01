import React, { Component } from 'react'
import serviceItemsApi from '../../services/serviceItems'
import ErrorsContainer from '../shared/ErrorsContainer'

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class ServiceItemEditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.serviceItem.name,
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
    const serviceItem = {
      name: this.state.name
    }

    serviceItemsApi.updateServiceItem(this.props.serviceItem.id, serviceItem)
    .then(response => {
      this.props.updateServiceItem(response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  updateUnits = (units) => {
    this.setState({ units: units })
  }


  resetForm = () => {
    this.setState({
      open: false,
      name: this.props.serviceItem.name,
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
          <DialogTitle>Edit Service Item</DialogTitle>
          <DialogContent>
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ServiceItemEditDialog
