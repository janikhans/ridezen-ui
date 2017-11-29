import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class RideRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>
          <Link className="no-decoration" to={`${this.props.ride.organization_id}/rides/${this.props.ride.id}`}>
            {this.props.ride.name}
          </Link>
        </TableCell>
        <TableCell numeric>
          {this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}
        </TableCell>
        <TableCell numeric>
          <Button dense color="primary">Action</Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default RideRow;
