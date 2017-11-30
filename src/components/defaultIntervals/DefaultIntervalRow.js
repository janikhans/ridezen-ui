import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class ServiceItemRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>{this.props.vehicleType.name}</TableCell>
        <TableCell numeric>{this.props.defaultInterval.distance}</TableCell>
        <TableCell numeric>{this.props.defaultInterval.units}</TableCell>
        <TableCell numeric>
          <Button dense color="primary" component={Link} to={'/service-items/' + this.props.defaultInterval.id}>View</Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default ServiceItemRow;
