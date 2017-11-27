import React, { Component } from 'react'
import vehiclesApi from '../../services/vehicles'
import ErrorsContainer from '../shared/ErrorsContainer'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class VehicleEditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      make: this.props.vehicle.make,
      model: this.props.vehicle.model,
      year: this.props.vehicle.year,
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
    const vehicle = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    }

    vehiclesApi.updateVehicle(this.props.vehicle.id, vehicle)
    .then(response => {
      this.props.updateVehicle(response.data)
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
      make: this.props.vehicle.make,
      model: this.props.vehicle.model,
      year: this.props.vehicle.year,
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
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Edit your vehicle. You will not be able to edit all fields such as starting mileage.`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <TextField
              autoFocus
              margin="dense"
              name="year"
              label="Vehicle Year"
              type="number"
              fullWidth
              value={this.state.year}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="make"
              label="Vehicle Make"
              type="text"
              fullWidth
              value={this.state.make}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="model"
              label="Vehicle Model"
              type="text"
              fullWidth
              value={this.state.model}
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

export default VehicleEditDialog
