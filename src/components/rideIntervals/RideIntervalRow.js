import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class RideIntervalRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>
          <Link className="no-decoration" to={'/service-items/' + this.props.serviceItem.id}>
            {this.props.serviceItem.name}
          </Link>
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
