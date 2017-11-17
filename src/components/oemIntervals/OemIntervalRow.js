import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

class OemIntervalRow extends Component {

  handleDelete = () => {
    this.props.deleteOemInterval(this.props.oemInterval.id)
  }

  render () {
    return (
      <TableRow>
        <TableCell>
          <Link className="no-decoration" to={'/service-items/' + this.props.oemInterval.service_item_id}>
            {this.props.oemInterval.service_item_id}
          </Link>
        </TableCell>
        <TableCell numeric>{this.props.oemInterval.units}</TableCell>
        <TableCell numeric>{this.props.oemInterval.distance}</TableCell>
        <TableCell numeric>
          <IconButton onClick={this.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

export default OemIntervalRow;
