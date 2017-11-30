import React, { Component } from 'react';
import serviceItemsApi from '../../services/serviceItems'
import update from 'immutability-helper'
import _ from 'lodash';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import DefaultIntervalCreateDialog from './DefaultIntervalCreateDialog';
import DefaultIntervalRow from './DefaultIntervalRow';

class DefaultIntervalsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultIntervals: []
    }
  }

  componentDidMount = () => {
    serviceItemsApi.getServiceItemDefaultIntervals(this.props.serviceItem.id)
    .then(response => {
      this.setState({
        defaultIntervals: response.data
      })
    })
    .catch(error => console.log(error))
  }

  deleteDefaultInterval = (defaultIntervalId) => {
    serviceItemsApi.deleteServiceItemDefaultInterval(this.props.serviceItem.id, defaultIntervalId)
    .then(response => {
      const defaultIntervalIndex = this.state.defaultIntervals.findIndex(x => x.id === defaultIntervalId)
      const defaultIntervals = update(this.state.defaultIntervals, { $splice: [[defaultIntervalIndex, 1]]})
      this.setState({defaultIntervals: defaultIntervals})
    })
    .catch(error => console.log(error))
  }

  addNewDefaultInterval = (defaultInterval) => {
    this.setState({
      defaultIntervals: this.state.defaultIntervals.concat(defaultInterval)
    });
  }

  updateDefaultInterval = (defaultInterval) => {
    this.setState({
      defaultIntervals: this.state.defaultIntervals.concat(defaultInterval)
    });
  }

  renderDefaultIntervalRow(defaultInterval) {
    const vehicleType = this.props.vehicleTypesById[defaultInterval.vehicle_type_id]
    return (
      <DefaultIntervalRow
        key={defaultInterval.id}
        vehicleType={vehicleType}
        defaultInterval={defaultInterval}
        deleteDefaultInterval={this.deleteDefaultInterval}
        updateDefaultInterval={this.updateDefaultInterval}
      />
    )
  }

  render () {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Type</TableCell>
                <TableCell numeric>Distance</TableCell>
                <TableCell numeric>Units</TableCell>
                <TableCell numeric>
                  <DefaultIntervalCreateDialog
                    serviceItem={this.props.serviceItem}
                    addNewDefaultInterval={this.addNewDefaultInterval}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.state.defaultIntervals, this.renderDefaultIntervalRow.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default DefaultIntervalsTable
