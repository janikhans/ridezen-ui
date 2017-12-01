import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class ServiceNotificationRow extends Component {
  render () {
    const dueIn = this.props.serviceNotification.due_in
    const units = this.props.serviceNotification.units

    const serviceDueDate = new Date(Date.now() + dueIn * 1000);
    const inPrefix = dueIn > 0 ? 'in' : ''
    const agoSuffix = dueIn <= 0 ? 'ago' : ''
    let status = ''

    if (units == 'miles' || units == 'kilometers' || units == 'hours') {
      const words = [inPrefix,dueIn,units,agoSuffix]
      status = words.join(" ");
    } else {
      status = <Moment date={serviceDueDate} fromNow />
    }

    if (dueIn <= 0) {
      status = <span className="red-text">{status}</span>
    }

    return (
      <TableRow>
        <TableCell>
          {this.props.serviceItem.name}
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
