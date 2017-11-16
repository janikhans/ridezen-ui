import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import VehicleDeleteDialog from './VehicleDeleteDialog';
import FillUpsTable from '../fillUps/FillUpsTable'
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

  render () {
    if (this.state.redirect) {
      return (
        <Redirect to='/vehicles'/>
      )
    } else if (this.state.vehicle) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="headline" component="h2">
              {this.state.vehicle.year} {this.state.vehicle.make} {this.state.vehicle.model}
              <VehicleDeleteDialog vehicle={this.state.vehicle} deleteVehicle={this.deleteVehicle} />
            </Typography>
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
