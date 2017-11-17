import React, { Component } from 'react';
import axios from 'axios'
import ErrorsContainer from '../shared/ErrorsContainer'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';


class RideCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicles: [],
      vehicleId: '',
      name: '',
      startingMileage: '',
      errors: null,
      open: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/vehicles.json')
    .then(response => {
      this.setState({vehicles: response.data})
    })
    .catch(error => console.log(error))
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSelect = (name) => (event) => {
    this.setState({[name]: event.target.value });
  };

  handleSubmit = (e) => {
    const ride = {
      vehicle_id: this.state.vehicleId,
      name: this.state.name,
      starting_mileage: this.state.startingMileage
    }

    axios.post(
      `http://localhost:3001/api/v1/rides`,
      {
        ride: ride
      })
    .then(response => {
      this.props.addNewRide(response.data)
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
      vehicleId: null,
      name: '',
      startingMileage: '',
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
              {`By adding a new ride to your garage, you'll be able to track mileage, get
              updates on maintenance and other goodness.`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <FormControl>
              <InputLabel htmlFor="vehicle-id">Vehicle</InputLabel>
              <Select value={this.state.vehicleId}
                autoWidth
                placeholder="Select Vehicle"
                name="vehicleId"
                onChange={this.handleSelect('vehicleId')}
                input={<Input id="vehicle-id" />}
              >
                if (this.state.vehicles){
                  this.state.vehicles.map((vehicle) => {
                    return (
                      <MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.year + " " + vehicle.make + " " + vehicle.model}</MenuItem>
                    )}
                  )
                }
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Ride Name"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="startingMileage"
              label="Starting Mileage"
              type="number"
              fullWidth
              value={this.state.startingMileage}
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

export default RideCreateDialog;
