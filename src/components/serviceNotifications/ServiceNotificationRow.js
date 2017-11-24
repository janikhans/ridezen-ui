import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class ServiceNotificationRow extends Component {
  render () {
    let status = ''

    if (this.props.serviceNotification.due_in >= 0) {
      status = "in " + this.props.serviceNotification.due_in + " " + this.props.serviceNotification.units

    } else {
      status =
        <span className="red-text">
          {this.props.serviceNotification.due_in + " " + this.props.serviceNotification.units + " ago"}
        </span>
    }

    return (
      <TableRow>
        <TableCell>
          <Link className="no-decoration" to={'/service-items/' + this.props.serviceItem.id}>
            {this.props.serviceItem.name}
          </Link>
        </TableCell>
        <TableCell numeric>
          {status}
        </TableCell>
        <TableCell numeric>
          <Button dense color="primary">Action</Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default ServiceNotificationRow;
