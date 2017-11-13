import React, { Component } from 'react';
import Table, { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

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
          <Button raised color="accent" onClick={this.handleDelete}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default FillUpRow;
