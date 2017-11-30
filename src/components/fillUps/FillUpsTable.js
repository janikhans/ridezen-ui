import React, { Component } from 'react';
import ridesApi from '../../services/rides'
import update from 'immutability-helper'
import FillUpRow from './FillUpRow';
import FillUpCreateDialog from './FillUpCreateDialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class FillUpsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ride: this.props.ride,
      fillUps: []
    }
  }

  componentDidMount = () => {
    ridesApi.getRideFillUps(this.props.ride.id)
    .then(response => {
      this.setState({
        fillUps: response.data
      })
    })
    .catch(error => console.log(error))
  }

  addNewFillUp = (fillUp) => {
    const fillUps = update(this.state.fillUps, {
      $unshift: [fillUp]
    })
    this.setState({
      fillUps: fillUps
    })
  }

  deleteFillUp = (id) => {
    ridesApi.deleteRideFillUp(this.props.ride.id, id)
    .then(response => {
      const fillUpIndex = this.state.fillUps.findIndex(x => x.id === id)
      const fillUps = update(this.state.fillUps, { $splice: [[fillUpIndex, 1]]})
      this.setState({fillUps: fillUps})
    })
    .catch(error => console.log(error))
  }

  render () {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell numeric>{this.props.ride.units}</TableCell>
            <TableCell numeric>Volume</TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell>Topped Off</TableCell>
            <TableCell>Note</TableCell>
            <TableCell><FillUpCreateDialog ride={this.state.ride} addNewFillUp={this.addNewFillUp} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.fillUps.map((fillUp) => {
            return(
              <FillUpRow key={fillUp.id} fillUp={fillUp}
                deleteFillUp={this.deleteFillUp} />
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

export default FillUpsTable;
