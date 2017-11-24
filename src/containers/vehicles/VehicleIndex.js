import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchVehicles, addNewVehicle } from '../../store/vehicles/actions';
import * as vehiclesSelectors from '../../store/vehicles/reducer';

import VehicleRow from '../../components/vehicles/VehicleRow';
import VehicleCreateDialog from '../../components/vehicles/VehicleCreateDialog';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class VehicleIndex extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  addNewVehicle = (vehicle) => {
    this.props.addNewVehicle(vehicle)
  }

  renderVehicleById(vehicleId) {
    const vehicle = this.props.vehiclesById[vehicleId]
    return (
      <VehicleRow key={vehicle.id} vehicle={vehicle}/>
    )
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
                <TableCell>Name</TableCell>
                <TableCell numeric>Distance</TableCell>
                <TableCell numeric>Units</TableCell>
                <TableCell numeric><VehicleCreateDialog addNewVehicle={this.addNewVehicle} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.props.vehiclesIdArray, this.renderVehicleById.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.vehicles.hasErrored,
    isLoading: state.vehicles.isLoading,
    vehiclesById: state.vehicles.vehiclesById,
    vehiclesIdArray: vehiclesSelectors.getVehiclesIdArray(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchVehicles()),
    addNewVehicle: (new_vehicle) => dispatch(addNewVehicle(new_vehicle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleIndex)
