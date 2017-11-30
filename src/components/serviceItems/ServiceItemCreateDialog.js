import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createServiceItem } from '../../store/serviceItems/actions';
import ErrorsContainer from '../shared/ErrorsContainer'
import UnitsSelect from '../shared/UnitsSelect'
import VehicleTypeSelect from '../../containers/shared/VehicleTypeSelect'

import vehicleTypesApi from '../../services/vehicleTypes'
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
      units: '',
      distance: '',
      vehicleTypeId: '',
      open: false,
      vehicleTypes: [],
      errors: null
    }
  }

  componentDidMount() {
    vehicleTypesApi.getVehicleTypes()
    .then(response => {
      this.setState({
        vehicleTypes: response.data
      });
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const serviceItem = {
      name: this.state.name,
      units: this.state.units,
      distance: this.state.distance,
      vehicle_type_id: this.state.vehicleTypeId
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

  updateUnits = (units) => {
    this.setState({ units: units })
  }

  updateVehicleType = (vehicleTypeId) => {
    this.setState({ vehicleTypeId: vehicleTypeId })
  }

  resetForm = () => {
    this.setState({
      open: false,
      units: '',
      distance: '',
      name: '',
      vehicleTypeId: '',
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
              {`Add new service items that will be used for all vehicles. Select the default distance and units.`}
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
            <VehicleTypeSelect
              vehicleTypes={this.state.vehicleTypes}
              updateVehicleType={this.updateVehicleType}
              vehicleTypeId={this.state.vehicleTypeId}
            />
            <UnitsSelect
              units={this.state.units}
              updateUnits={this.updateUnits}
            />
            <TextField
              margin="dense"
              name="distance"
              label="Distance"
              type="text"
              fullWidth
              value={this.state.distance}
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
