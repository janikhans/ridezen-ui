import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class ServiceItemRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>{this.props.serviceItem.name}</TableCell>
        <TableCell numeric>{this.props.serviceItem.distance}</TableCell>
        <TableCell numeric>{this.props.serviceItem.units}</TableCell>
        <TableCell numeric>
          <Button dense color="primary" component={Link} to={'/service-items/' + this.props.serviceItem.id}>View</Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default ServiceItemRow;
