import React, { Component } from 'react';
import vehicleTypesApi from '../../services/vehicleTypes'
import update from 'immutability-helper'
import _ from 'lodash';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import VehicleTypeCreateDialog from '../vehicleTypes/VehicleTypeCreateDialog';
import VehicleTypeRow from './VehicleTypeRow';

class VehicleTypesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicleTypes: []
    }
  }

  componentDidMount = () => {
    vehicleTypesApi.getVehicleTypes()
    .then(response => {
      this.setState({
        vehicleTypes: response.data
      })
    })
    .catch(error => console.log(error))
  }

  addVehicleType = (vehicleType) => {
    const vehicleTypes = update(this.state.vehicleTypes, {
      $unshift: [vehicleType]
    })
    this.setState({
      vehicleTypes: vehicleTypes
    })
  }

  deleteVehicleType = (vehicleTypeId) => {
    vehicleTypesApi.deleteVehicleType(vehicleTypeId)
    .then(response => {
      const vehicleTypeIndex = this.state.vehicleTypes.findIndex(x => x.id === vehicleTypeId)
      const vehicleTypes = update(this.state.vehicleTypes, { $splice: [[vehicleTypeIndex, 1]]})
      this.setState({vehicleTypes: vehicleTypes})
    })
    .catch(error => console.log(error))
  }

  updateVehicleType = (vehicleType) => {
    const vehicleTypeIndex = this.state.vehicleTypes.findIndex(x => x.id === vehicleType.id)
    let vehicleTypes = update(this.state.vehicleTypes, { $splice: [[vehicleTypeIndex, 1]]})
    vehicleTypes.push(vehicleType)
    this.setState({vehicleTypes: vehicleTypes})
  }

  renderVehicleTypeRow(vehicleType) {
    return (
      <VehicleTypeRow key={vehicleType.id}
        vehicleType={vehicleType}
        deleteVehicleType={this.deleteVehicleType}
        updateVehicleType={this.updateVehicleType}
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
                <TableCell>Type</TableCell>
                <TableCell numeric>Edit</TableCell>
                <TableCell numeric><VehicleTypeCreateDialog addVehicleType={this.addVehicleType} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.state.vehicleTypes, this.renderVehicleTypeRow.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default VehicleTypesTable
