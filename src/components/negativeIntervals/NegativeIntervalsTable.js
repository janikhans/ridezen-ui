import React, { Component } from 'react';
import vehiclesApi from '../../services/member/vehicles'
import update from 'immutability-helper'
import _ from 'lodash';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import NegativeIntervalRow from './NegativeIntervalRow';

class NegativeIntervalsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: this.props.vehicle,
      negativeIntervals: []
    }
  }

  componentDidMount = () => {
    vehiclesApi.getVehicleNegativeIntervals(this.state.vehicle.id)
    .then(response => {
      this.setState({
        negativeIntervals: response.data
      })
    })
    .catch(error => console.log(error))
  }

  deleteNegativeInterval = (id) => {
    vehiclesApi.deleteVehicleNegativeInterval(this.state.vehicle.id, id)
    .then(response => {
      const negativeIntervalIndex = this.state.negativeIntervals.findIndex(x => x.id === id)
      const negativeIntervals = update(this.state.negativeIntervals, { $splice: [[negativeIntervalIndex, 1]]})
      this.setState({negativeIntervals: negativeIntervals})
    })
    .catch(error => console.log(error))
  }

  renderNegativeIntervalRow(negativeInterval) {
    const serviceItem = this.props.serviceItemsById[negativeInterval.service_item_id]
    return (
      <NegativeIntervalRow key={negativeInterval.id}
        negativeInterval={negativeInterval}
        deleteNegativeInterval={this.deleteNegativeInterval}
        serviceItem={serviceItem}
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
                <TableCell>Service Item</TableCell>
                <TableCell numeric></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.state.negativeIntervals, this.renderNegativeIntervalRow.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default NegativeIntervalsTable;
