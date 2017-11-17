import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import VehicleDeleteDialog from './VehicleDeleteDialog';
import VehicleEditDialog from './VehicleEditDialog';
import OemIntervalsTable from '../oemIntervals/OemIntervalsTable'

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class VehicleShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: null,
      redirect: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/vehicles/${this.props.match.params.vehicleId}.json`)
    .then(response => {
      this.setState({
        vehicle: response.data
      })
    })
    .catch(error => console.log(error))
  }

  deleteVehicle = (id) => {
    axios.delete(`http://localhost:3001/api/v1/vehicles/${id}`)
    .then(response => {
      this.setState({ redirect: true })
    })
    .catch(error => console.log(error))
  }

  updateVehicle = (vehicle) => {
    this.setState({
      vehicle: vehicle
    })
  }

  render () {
    if (this.state.redirect) {
      return (
        <Redirect to='/vehicles'/>
      )
    } else if (this.state.vehicle) {
      return (
        <div>
          <Typography type="display1" gutterBottom>
            General
          </Typography>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1">
              {this.state.vehicle.year} {this.state.vehicle.make} {this.state.vehicle.model}
            </Typography>
            <VehicleEditDialog vehicle={this.state.vehicle} updateVehicle={this.updateVehicle} />
            <VehicleDeleteDialog vehicle={this.state.vehicle} deleteVehicle={this.deleteVehicle} />
          </Paper>
          <Typography type="display1" gutterBottom>
            OEM Intervals
          </Typography>
          <OemIntervalsTable vehicle={this.state.vehicle} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Wait...</h1>
        </div>
    )}
  }
}

export default VehicleShow;
