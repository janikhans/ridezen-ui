import React, { Component } from 'react';

import vehicleTypesApi from '../../services/vehicleTypes'
import ErrorsContainer from '../shared/ErrorsContainer'

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class VehicleTypeCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const vehicleType = {
      name: this.state.name
    }
    vehicleTypesApi.createVehicleType(vehicleType)
    .then(response => {
      this.props.addVehicleType(response.data)
      this.resetForm()
    })
    .catch(error => {
      console.log(error)
    })
    e.preventDefault();
  }

  resetForm = () => {
    this.setState({
      open: false,
      name: ''
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Add Vehicle Type</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Add new Vehicle type`}
            </DialogContentText>
            {this.props.errors && <ErrorsContainer errors={this.props.errors}/>}
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

export default VehicleTypeCreateDialog
