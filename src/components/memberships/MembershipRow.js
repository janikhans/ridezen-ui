import React, { Component } from 'react';
import Moment from 'react-moment';

import MembershipDeleteDialog from './MembershipDeleteDialog'

import { TableCell, TableRow } from 'material-ui/Table';

class ServiceRow extends Component {
  render () {
    let accepted = ''
    if (this.props.membership.accepted === null) {
      accepted = 'Pending'
    } else if (this.props.membership.accepted === true ){
      accepted = 'Accepted'
    } else {
      accepted = 'Declined'
    }
    return (
      <TableRow>
        <TableCell>{this.props.membership.user_id}</TableCell>
        <TableCell numeric>{this.props.membership.role}</TableCell>
        <TableCell numeric>{accepted}</TableCell>
        <TableCell numeric>
          <Moment
            date={this.props.membership.created_at}
            format="MM/DD/YYYY"
          />
        </TableCell>
        <TableCell numeric>
          <MembershipDeleteDialog
            membership={this.props.membership}
            deleteMembership={this.props.deleteMembership}
          />
        </TableCell>
      </TableRow>
    )
  }
}

export default ServiceRow;
