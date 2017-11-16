import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import VehicleDeleteDialog from './VehicleDeleteDialog';
import VehicleEditDialog from './VehicleEditDialog';
import FillUpsTable from '../fillUps/FillUpsTable'
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
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
    const styles = {
      button: { margin: '5px' }
    }
    if (this.state.redirect) {
      return (
        <Redirect to='/garage'/>
      )
    } else if (this.state.vehicle) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1" component="h2">
              {this.state.vehicle.year} {this.state.vehicle.make} {this.state.vehicle.model}
            </Typography>
            <Typography type="subheading" component="p">
              Starting Mileage: {this.state.vehicle.starting_mileage}
            </Typography>
            <VehicleEditDialog vehicle={this.state.vehicle} updateVehicle={this.updateVehicle} />
            <VehicleDeleteDialog vehicle={this.state.vehicle} deleteVehicle={this.deleteVehicle} />
          </Paper>
          <FillUpsTable vehicle={this.state.vehicle} />
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
