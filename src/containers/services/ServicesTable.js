import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRideServices } from '../../store/rides/actions';
import { fetchServiceItems } from '../../store/serviceItems/actions';
import * as serviceSelectors from '../../store/rides/services/reducer';

import ServiceRow from '../../components/services/ServiceRow';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class ServicesTable extends Component {
  componentDidMount() {
    if (this.props.serviceItemsById.length == 0){
      this.props.fetchServiceItemsData()
    }
    this.props.fetchServiceData(this.props.ride.id)
  }

  renderServiceById(serviceId) {
    const service = this.props.servicesById[serviceId]
    const serviceItem = this.props.serviceItemsById[service.service_item_id]
    return (
      <ServiceRow key={service.id} service={service} serviceItem={serviceItem}/>
    )
  }

  render () {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Date</TableCell>
            <TableCell numeric>Distance</TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell numeric>Note</TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(this.props.servicesIdArray, this.renderServiceById.bind(this))}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const rideId = ownProps.ride.id
  return {
    servicesIdArray: serviceSelectors.getServicesIdArray(state, rideId),
    servicesById: serviceSelectors.getServicesById(state, rideId),
    serviceItemsById: state.serviceItems.serviceItemsById
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceData: (rideId) => dispatch(fetchRideServices(rideId)),
    fetchServiceItemsData: () => dispatch(fetchServiceItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable)
