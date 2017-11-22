import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchRideServices } from '../../store/rides/services/actions';
import * as servicesSelectors from '../../store/rides/services/reducer';

import ServiceRow from '../../components/services/ServiceRow';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class ServiceTable extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.ride.id)
  }

  renderServiceById(serviceId) {
    const service = this.props.servicesById[serviceId]
    const serviceItem = this.props.serviceItemsById[serviceId]
    return (
      <ServiceRow key={service.id} service={service} serviceItem={serviceItem}/>
    )
  }

  render () {
    return (
      <div>
        <Paper className="paper-header" elevation={1}>
          <Typography type="headline" component="h2">
            Services
          </Typography>
        </Paper>
        <Paper>
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
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.services.hasErrored,
    isLoading: state.services.isLoading,
    servicesById: state.services.servicesById,
    servicesIdArray: servicesSelectors.getServicesIdArray(state),
    serviceItemsById: state.serviceItems.serviceItemsById
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (rideId) => dispatch(fetchRideServices(rideId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTable)
