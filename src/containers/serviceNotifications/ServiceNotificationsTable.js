import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRideServiceNotifications } from '../../store/serviceNotifications/actions';
import { fetchServiceItems } from '../../store/serviceItems/actions';
import * as serviceNotifictionSelectors from '../../store/serviceNotifications/reducer';
import * as serviceItemsSelectors from '../../store/serviceItems/reducer';

import ServiceNotificationRow from '../../components/serviceNotifications/ServiceNotificationRow';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class ServiceNotificationsTable extends Component {
  componentDidMount() {
    this.props.fetchServiceNotificationData(this.props.ride.id)
  }

  renderIntervalById(serviceNotificationId) {
    const serviceNotification = this.props.serviceNotificationsById[serviceNotificationId]
    const serviceItem = this.props.serviceItemsById[serviceNotification.service_item_id]
    return (
      <ServiceNotificationRow key={serviceNotification.id} serviceNotification={serviceNotification} serviceItem={serviceItem}/>
    )
  }

  render () {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell numeric>Due</TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(this.props.serviceNotificationsIdArray, this.renderIntervalById.bind(this))}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const rideId = ownProps.ride.id
  return {
    serviceNotificationsIdArray: serviceNotifictionSelectors.getServiceNotificationsIdArray(state, rideId),
    serviceNotificationsById: serviceNotifictionSelectors.getServiceNotificationsById(state, rideId),
    serviceItemsById: serviceItemsSelectors.getServiceItemsById(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceNotificationData: (rideId) => dispatch(fetchRideServiceNotifications(rideId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceNotificationsTable)
