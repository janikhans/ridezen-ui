import React, { Component } from 'react';
import axios from 'axios'
import ErrorsContainer from '../shared/ErrorsContainer'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add'
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class VehicleCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      make: '',
      model: '',
      year: '',
      errors: null,
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
    const vehicle = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    }

    axios.post(
      `http://localhost:3001/api/v1/vehicles`,
      {
        vehicle: vehicle
      })
    .then(response => {
      this.props.addNewVehicle(response.data)
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
      make: '',
      model: '',
      year: '',
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
          <DialogTitle>Add to Garage</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`By adding a new vehicle to your garage, you'll be able to track mileage, get
              updates on maintenance and other goodness.`}
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
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default VehicleCreateDialog;
