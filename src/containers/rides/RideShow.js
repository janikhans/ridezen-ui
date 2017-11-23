import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';

import RideDeleteDialog from '../../components/rides/RideDeleteDialog';
import RideEditDialog from '../../components/rides/RideEditDialog';
import FillUpsTable from '../../components/fillUps/FillUpsTable'
import ServicesTable from '../services/ServicesTable'
import RideIntervalsTable from '../rideIntervals/RideIntervalsTable'
import ServiceNotificationsTable from '../serviceNotifications/ServiceNotificationsTable'

import { fetchRideInfo, deleteRide, updateRide } from '../../store/rides/actions';
import * as ridesSelectors from '../../store/rides/reducer'

function TabContainer(props) {
  return <div>{props.children}</div>;
}

class RideShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'fillups'
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
    this.props.updateRide(ride)
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
          <Paper>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="accent"
              textColor="accent"
            >
              <Tab value="fillups" icon={<PhoneIcon />} label="FILLUPS" />
              <Tab value="services" icon={<FavoriteIcon />} label="SERVICES" />
              <Tab value="intervals" icon={<PersonPinIcon />} label="INTERVALS" />
              <Tab value="notifications" icon={<PersonPinIcon />} label="NOTIFICATIONS" />
            </Tabs>
          </Paper>
          <Paper>
            {this.state.value === 'fillups' && <TabContainer><FillUpsTable ride={this.props.ride} /></TabContainer>}
            {this.state.value === 'services' && <TabContainer><ServicesTable ride={this.props.ride} /></TabContainer>}
            {this.state.value === 'intervals' && <TabContainer><RideIntervalsTable ride={this.props.ride} /></TabContainer>}
            {this.state.value === 'notifications' && <TabContainer><ServiceNotificationsTable ride={this.props.ride} /></TabContainer>}
          </Paper>
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
    ride: ridesSelectors.getRideById(state, ownProps.match.params.rideId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (rideId) => dispatch(fetchRideInfo(rideId)),
    deleteRide: (rideId) => dispatch(deleteRide(rideId)),
    updateRide: (ride) => dispatch(updateRide(ride)),
    garageRedirect: () => dispatch(push('/garage'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
