import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

class NegativeIntervalRow extends Component {

  handleDelete = () => {
    this.props.deleteNegativeInterval(this.props.negativeInterval.id)
  }

  render () {
    return (
      <TableRow>
        <TableCell>
          <Link className="no-decoration" to={'/service-items/' + this.props.negativeInterval.service_item_id}>
            {this.props.negativeInterval.service_item_id}
          </Link>
        </TableCell>
        <TableCell numeric>
          <IconButton onClick={this.handleDelete}><DeleteIcon /></IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

export default NegativeIntervalRow;
