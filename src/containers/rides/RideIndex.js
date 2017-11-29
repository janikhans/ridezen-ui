import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as vehiclesSelectors from '../../store/vehicles/reducer'
import * as ridesSelectors from '../../store/rides/reducer';
import * as organizationsSelectors from '../../store/organizations/reducer';

import RideCard from '../../components/rides/RideCard';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class RideIndex extends Component {
  renderCardById(rideId) {
    const ride = _.get(this.props.ridesById, rideId)
    const vehicle = _.get(this.props.vehiclesById, ride.vehicle_id)
    const organization = _.get(this.props.organizationsById, ride.organization_id)
    return (
      <RideCard
        key={rideId}
        ride={ride}
        vehicle={vehicle}
        organization={organization}
      />
    )
  }

  render () {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <div>
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="headline" component="h2">
              Your Garage
            </Typography>
          </Paper>
        </div>
        <Grid container spacing={24}>
          {_.map(this.props.ridesIdArray, this.renderCardById.bind(this))}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.rides.hasErrored,
    isLoading: state.rides.isLoading,
    ridesById: ridesSelectors.getRidesById(state),
    ridesIdArray: ridesSelectors.getRidesIdArray(state),
    vehiclesById: vehiclesSelectors.getVehiclesById(state),
    vehicles: vehiclesSelectors.getVehicles(state),
    organizationsById: organizationsSelectors.getOrganizationsById(state)
  };
};

export default connect(mapStateToProps, null)(RideIndex)
