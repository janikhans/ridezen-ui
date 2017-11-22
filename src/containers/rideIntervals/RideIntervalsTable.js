import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRideIntervals } from '../../store/rideIntervals/actions';
import { fetchServiceItems } from '../../store/serviceItems/actions';
import * as rideIntervalSelectors from '../../store/rideIntervals/reducer';

import RideIntervalRow from '../../components/rideIntervals/RideIntervalRow';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class RideIntervalsTable extends Component {
  componentDidMount() {
    if (this.props.serviceItemsById.length === 0){
      this.props.fetchServiceItemsData()
    }
    this.props.fetchIntervalData(this.props.ride.id)
  }

  renderIntervalById(rideIntervalId) {
    const rideInterval = this.props.rideIntervalsById[rideIntervalId]
    const serviceItem = this.props.serviceItemsById[rideInterval.service_item_id]
    return (
      <RideIntervalRow key={rideInterval.id} rideInterval={rideInterval} serviceItem={serviceItem}/>
    )
  }

  render () {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell numeric>Interval</TableCell>
            <TableCell numeric>Source</TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(this.props.rideIntervalsIdArray, this.renderIntervalById.bind(this))}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const rideId = ownProps.ride.id
  return {
    rideIntervalsIdArray: rideIntervalSelectors.getRideIntervalsIdArray(state, rideId),
    rideIntervalsById: rideIntervalSelectors.getRideIntervalsById(state, rideId),
    serviceItemsById: state.serviceItems.serviceItemsById
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIntervalData: (rideId) => dispatch(fetchRideIntervals(rideId)),
    fetchServiceItemsData: () => dispatch(fetchServiceItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RideIntervalsTable)
