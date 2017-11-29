import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addNewRide } from '../../store/rides/actions'
import * as ridesSelectors from '../../store/rides/reducer';
import * as vehiclesSelectors from '../../store/vehicles/reducer';

import RideRow from '../../components/rides/RideRow';
import RideCreateDialog from '../../components/rides/RideCreateDialog';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class RidesTable extends Component {

  addOrganizationRide = (newRide) => {
    this.props.addNewRide(newRide)
  }

  renderRideById(rideId) {
    const ride = this.props.ridesById[rideId]
    const vehicle = _.find(this.props.vehicles, { id: ride.vehicle_id })
    return (
      <RideRow key={ride.id} ride={ride} vehicle={vehicle}/>
    )
  }

  render () {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Vehicle</TableCell>
            <TableCell numeric>
              <RideCreateDialog
                addOrganizationRide={this.addOrganizationRide}
                vehicles={this.props.vehicles}
                organization={this.props.organization}
              />
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(this.props.ridesIdArray, this.renderRideById.bind(this))}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ridesById: ridesSelectors.getRidesForOrganizationById(state, ownProps.organization.id),
    ridesIdArray: ridesSelectors.getRidesForOrganizationIdArray(state, ownProps.organization.id),
    vehicles: vehiclesSelectors.getVehicles(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRide: (newRide) => dispatch(addNewRide(newRide))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesTable)
