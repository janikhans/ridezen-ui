import React, { Component } from 'react';

import { TableCell, TableRow } from 'material-ui/Table';
import VehicleTypeEditDialog from './VehicleTypeEditDialog'
import VehicleTypeDeleteDialog from './VehicleTypeDeleteDialog'

class VehicleTypeRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>{this.props.vehicleType.name}</TableCell>
        <TableCell numeric>
          <VehicleTypeEditDialog
            vehicleType={this.props.vehicleType}
            updateVehicleType={this.props.updateVehicleType}
          />
        </TableCell>
        <TableCell numeric>
          <VehicleTypeDeleteDialog
            vehicleType={this.props.vehicleType}
            deleteVehicleType={this.props.deleteVehicleType}
          />
        </TableCell>
      </TableRow>
    )
  }
}

export default VehicleTypeRow;
