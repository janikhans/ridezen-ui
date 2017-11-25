import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import _ from 'lodash';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import OemIntervalCreateDialog from '../oemIntervals/OemIntervalCreateDialog';
import VehicleIntervalRow from './VehicleIntervalRow';

class VehicleIntervalsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: this.props.vehicle,
      vehicleIntervals: []
    }
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/intervals.json`)
    .then(response => {
      this.setState({
        vehicleIntervals: response.data
      })
    })
    .catch(error => console.log(error))
  }

  addNewOemInterval = (oemInterval) => {
    oemInterval.oem_interval_id = oemInterval.id
    const vehicleIntervals = update(this.state.vehicleIntervals, {
      $unshift: [oemInterval]
    })
    this.setState({
      vehicleIntervals: vehicleIntervals
    })
  }

  deleteOemInterval = (id) => {
    axios.delete(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/oem_intervals/${id}`)
    .then(response => {
      const oemIntervalIndex = this.state.vehicleIntervals.findIndex(x => x.oem_interval_id === id)
      const vehicleIntervals = update(this.state.vehicleIntervals, { $splice: [[oemIntervalIndex, 1]]})
      this.setState({vehicleIntervals: vehicleIntervals})
    })
    .catch(error => console.log(error))
  }

  createNegativeInterval = (serviceItemId) => {
    const negative_interval = { service_item_id: serviceItemId }
    axios.post(`http://localhost:3001/api/v1/vehicles/${this.props.vehicle.id}/negative_intervals`,
      { negative_interval: negative_interval })
    .then(response => {
      this.updateNegativeInterval(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  updateNegativeInterval = (negativeInterval) => {
    const intervalIndex = this.state.vehicleIntervals.findIndex(x => x.service_item_id === negativeInterval.service_item_id)
    const vehicleIntervals = update(this.state.vehicleIntervals, { $splice: [[intervalIndex, 1]]})
    this.setState({vehicleIntervals: vehicleIntervals})
  }

  renderVehicleIntervalRow(vehicleInterval) {
    const serviceItem = this.props.serviceItemsById[vehicleInterval.service_item_id]
    return (
      <VehicleIntervalRow key={vehicleInterval.service_item_id} vehicleInterval={vehicleInterval}
        deleteOemInterval={this.deleteOemInterval}
        createNegativeInterval={this.createNegativeInterval}
        serviceItem={serviceItem} />
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
                <TableCell numeric>Units</TableCell>
                <TableCell numeric>Distance</TableCell>
                <TableCell numeric>Source</TableCell>
                <TableCell numeric><OemIntervalCreateDialog vehicle={this.state.vehicle} addNewOemInterval={this.addNewOemInterval} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.state.vehicleIntervals, this.renderVehicleIntervalRow.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default VehicleIntervalsTable
