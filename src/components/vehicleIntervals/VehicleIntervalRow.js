import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import RemoveIcon from 'material-ui-icons/NotInterested';

class VehicleIntervalRow extends Component {

  handleDelete = () => {
    this.props.deleteOemInterval(this.props.vehicleInterval.oem_interval_id)
  }

  handleCreate = () => {
    this.props.createNegativeInterval(this.props.vehicleInterval.service_item_id)
  }

  render () {
    let button = ''
    let source = ''

    if (this.props.vehicleInterval.oem_interval_id) {
      button = <IconButton onClick={this.handleDelete}><DeleteIcon /></IconButton>
      source = 'OEM'
    } else {
      button = <IconButton onClick={this.handleCreate}><RemoveIcon/></IconButton>
      source = 'Default'
    }

    return (
      <TableRow>
        <TableCell>
          <Link className="no-decoration" to={'/service-items/' + this.props.vehicleInterval.service_item_id}>
            {this.props.vehicleInterval.service_item_id}
          </Link>
        </TableCell>
        <TableCell numeric>{this.props.vehicleInterval.units}</TableCell>
        <TableCell numeric>{this.props.vehicleInterval.distance}</TableCell>
        <TableCell numeric>{source}</TableCell>
        <TableCell numeric>
          {button}
        </TableCell>
      </TableRow>
    )
  }
}

export default VehicleIntervalRow;
