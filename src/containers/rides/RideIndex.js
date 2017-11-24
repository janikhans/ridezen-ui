import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRides, createRide } from '../../store/rides/actions';

import * as vehiclesSelectors from '../../store/vehicles/reducer'
import * as ridesSelectors from '../../store/rides/reducer';

import RideCard from '../../components/rides/RideCard';
import RideCreateDialog from '../../components/rides/RideCreateDialog';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class RideIndex extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  addNewRide = (ride) => {
    this.props.createRide(ride)
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
              <RideCreateDialog addNewRide={this.addNewRide} />
            </Typography>
          </Paper>
        </div>
        <Grid container spacing={24}>
          {_.map(this.props.ridesIdArray, this.renderCardById.bind(this))}
        </Grid>
      </div>
    )
  }

  renderCardById(rideId) {
    const ride = _.get(this.props.ridesById, rideId)
    const vehicle = _.get(this.props.vehiclesById, ride.vehicle_id)
    return (
      <RideCard key={rideId} ride={ride} vehicle={vehicle}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.rides.hasErrored,
    isLoading: state.rides.isLoading,
    ridesById: state.rides.ridesById,
    ridesIdArray: ridesSelectors.getRidesIdArray(state),
    vehiclesById: vehiclesSelectors.getVehiclesById(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchRides()),
    createRide: (ride) => dispatch(createRide(ride))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RideIndex)
