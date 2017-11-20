import React, { Component } from 'react';
import update from 'immutability-helper'
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRides } from '../../store/rides/actions';
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
    const rides = update(this.state.rides, {
      $push: [ride]
    })
    this.setState({
      rides: rides
    })
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
    return (
      <RideCard key={rideId} ride={ride} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.rides.hasErrored,
    isLoading: state.rides.isLoading,
    ridesById: state.rides.ridesById,
    ridesIdArray: ridesSelectors.getRidesIdArray(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchRides())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RideIndex)