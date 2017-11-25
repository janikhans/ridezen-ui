import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRideServices, addRideService } from '../../store/rides/actions';
import { fetchServiceItems } from '../../store/serviceItems/actions';
import * as serviceSelectors from '../../store/rides/services/reducer';
import * as serviceItemsSelectors from '../../store/serviceItems/reducer';

import ServiceRow from '../../components/services/ServiceRow';
import ServiceCreateDialog from '../../components/services/ServiceCreateDialog';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class ServicesTable extends Component {
  componentDidMount() {
    if (this.props.serviceItemsById.length === 0){
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

  addRideService = (rideId, new_service) => {
    this.props.addRideService(rideId, new_service)
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
            <TableCell numeric><ServiceCreateDialog ride={this.props.ride} addRideService={this.addRideService} /></TableCell>
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
    serviceItemsById: serviceItemsSelectors.getServiceItemsById()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceData: (rideId) => dispatch(fetchRideServices(rideId)),
    fetchServiceItemsData: () => dispatch(fetchServiceItems()),
    addRideService: (rideId, new_service) => dispatch(addRideService(rideId, new_service))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable)
