import React, { Component } from 'react';
import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

class FillUpRow extends Component {

  handleDelete = () => {
    this.props.deleteFillUp(this.props.fillUp.id)
  }

  render () {
    return (
      <TableRow>
        <TableCell>{this.props.fillUp.date}</TableCell>
        <TableCell numeric>{this.props.fillUp.mileage}</TableCell>
        <TableCell numeric>{this.props.fillUp.volume}</TableCell>
        <TableCell numeric>{this.props.fillUp.price}</TableCell>
        <TableCell>{this.props.fillUp.topped_off ? 'Yes' : 'No'}</TableCell>
        <TableCell>{this.props.fillUp.note}</TableCell>
        <TableCell>
          <IconButton onClick={this.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

export default FillUpRow;
