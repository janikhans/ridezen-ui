import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchServiceItems } from '../../store/serviceItems/actions';
import * as serviceItemsSelectors from '../../store/serviceItems/reducer';

import ServiceItemRow from '../../components/serviceItems/ServiceItemRow';
import ServiceItemCreateDialog from '../../components/serviceItems/ServiceItemCreateDialog';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class ServiceItemIndex extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  renderServiceItemById(serviceItemId) {
    const serviceItem = this.props.serviceItemsById[serviceItemId]
    return (
      <ServiceItemRow key={serviceItem.id} serviceItem={serviceItem}/>
    )
  }

  render () {
    return (
      <div>
        <Paper className="paper-header" elevation={1}>
          <Typography type="headline" component="h2">
            Service Items
          </Typography>
        </Paper>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Distance</TableCell>
                <TableCell numeric>Units</TableCell>
                <TableCell numeric><ServiceItemCreateDialog /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.props.serviceItemsIdArray, this.renderServiceItemById.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.serviceItems.hasErrored,
    isLoading: state.serviceItems.isLoading,
    serviceItemsById: serviceItemsSelectors.getServiceItemsById(state),
    serviceItemsIdArray: serviceItemsSelectors.getServiceItemsIdArray(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchServiceItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItemIndex)
