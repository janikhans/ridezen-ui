import React, { Component } from 'react';

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class RideIntervalRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>
          {this.props.serviceItem.name}
        </TableCell>
        <TableCell numeric>
          { "every " + this.props.rideInterval.distance + " " + this.props.rideInterval.units }
        </TableCell>
        <TableCell numeric>{this.props.rideInterval.source}</TableCell>
        <TableCell numeric>
          <Button dense color="primary">Action</Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default RideIntervalRow;
