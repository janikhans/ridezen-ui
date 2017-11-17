import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import VehicleRow from './VehicleRow';
import VehicleCreateDialog from './VehicleCreateDialog';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
        <Paper className="paper-header" elevation={1}>
          <Typography type="headline" component="h2">
            Vehicles
          </Typography>
        </Paper>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell numeric>Make</TableCell>
                <TableCell numeric>Model</TableCell>
                <TableCell numeric><VehicleCreateDialog addNewVehicle={this.addNewVehicle} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.vehicles.map((vehicle) => {
                return(
                  <VehicleRow key={vehicle.id} vehicle={vehicle}/>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default VehicleIndex;
