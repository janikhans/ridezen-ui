import React, { Component } from 'react'
import axios from 'axios'

import ErrorsContainer from '../shared/ErrorsContainer'
import UnitsSelect from '../shared/UnitsSelect'
import ServiceItemSelect from '../shared/ServiceItemSelect'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class OemIntervalCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceItemId: '',
      units: '',
      distance: '',
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
    const oemInterval = {
      service_item_id: this.state.serviceItemId,
      units: this.state.units,
      distance: this.state.distance,
    }

    axios.post(
      `http://localhost:3001/api/v1/vehicles/${this.props.vehicle.id}/oem_intervals`,
      {
        oem_interval: oemInterval
      })
    .then(response => {
      this.props.addNewOemInterval(response.data)
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

  updateServiceItem = (serviceItemId) => {
    this.setState({ serviceItemId: serviceItemId })
  }

  resetForm = () => {
    this.setState({
      serviceItemId: '',
      units: '',
      distance: '',
      errors: null,
      open: false
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Oem Interval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add an OEM interval for this vehicle.
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <div><ServiceItemSelect serviceItemId={this.state.serviceItemId} updateServiceItem={this.updateServiceItem}/></div>
            <UnitsSelect units={this.state.units} updateUnits={this.updateUnits}/>
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
    )
  }
}

export default OemIntervalCreateDialog;
