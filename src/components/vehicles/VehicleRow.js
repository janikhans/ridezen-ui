import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Button from 'material-ui/Button';
import { TableCell, TableRow } from 'material-ui/Table';

class VehicleRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>{this.props.vehicle.year}</TableCell>
        <TableCell numeric>{this.props.vehicle.make}</TableCell>
        <TableCell numeric>{this.props.vehicle.model}</TableCell>
        <TableCell numeric>
          <Button dense color="primary" component={Link} to={'/vehicles/' + this.props.vehicle.id}>View</Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default VehicleRow;
