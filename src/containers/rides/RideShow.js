import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import RideDeleteDialog from '../../components/rides/RideDeleteDialog';
import RideEditDialog from '../../components/rides/RideEditDialog';
import FillUpsTable from '../../components/fillUps/FillUpsTable'
import ServiceTable from '../services/ServiceTable'

import { fetchRideInfo, deleteRide } from '../../store/rides/actions';
import * as ridesSelectors from '../../store/rides/reducer'

class RideShow extends Component {
  componentDidMount() {
    if (this.props.ride) {
      this.props.fetchInfo(this.props.ride.id)
    } else {
      this.props.garageRedirect()
    }
  }

  deleteRide = (id) => {
    this.props.deleteRide(this.props.ride.id)
  }

  updateRide = (ride) => {
    this.setState({
      ride: ride
    })
  }

  render () {
    if (this.props.ride) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1" component="h2">
              {this.props.ride.name}
            </Typography>
            <Typography type="subheading" component="p">
              Starting Mileage: {this.props.ride.starting_mileage}
            </Typography>
            <Typography type="subheading" component="p">
              Current Mileage: {this.props.ride.current_mileage}
            </Typography>
            <RideEditDialog ride={this.props.ride} updateRide={this.updateRide} />
            <RideDeleteDialog ride={this.props.ride} deleteRide={this.deleteRide} />
          </Paper>
          <FillUpsTable ride={this.props.ride} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    ride: ridesSelectors.getRideById(state, ownProps.match.params.rideId),
    redirect: state.rediret
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (rideId) => dispatch(fetchRideInfo(rideId)),
    deleteRide: (rideId) => dispatch(deleteRide(rideId)),
    garageRedirect: () => dispatch(push('/garage'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
