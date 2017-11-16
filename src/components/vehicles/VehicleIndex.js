import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import VehicleCard from './VehicleCard';
import VehicleCreateDialog from './VehicleCreateDialog';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class VehicleIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicles: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/vehicles.json')
    .then(response => {
      this.setState({vehicles: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewVehicle = (vehicle) => {
    const vehicles = update(this.state.vehicles, {
      $push: [vehicle]
    })
    this.setState({
      vehicles: vehicles
    })
  }

  render () {
    return (
      <div>
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="headline" component="h2">
              Your Garage
              <VehicleCreateDialog addNewVehicle={this.addNewVehicle} />
            </Typography>
          </Paper>
        </div>
        <Grid container spacing={24}>
          {this.state.vehicles.map((vehicle) => {
            return (
              <VehicleCard vehicle={vehicle} key={vehicle.id}
                onClick={this.enableEditing}
                onDelete={this.deleteVehicle} />
            )}
          )}
        </Grid>
      </div>
    )
  }
}

export default VehicleIndex;
