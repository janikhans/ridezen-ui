import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import FillUpRow from './FillUpRow';
import FillUpCreateDialog from './FillUpCreateDialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class FillUpsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: this.props.vehicle,
      fillUps: []
    }
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/fill_ups.json`)
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
    axios.delete(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/fill_ups/${id}`)
    .then(response => {
      const fillUpIndex = this.state.fillUps.findIndex(x => x.id === id)
      const fillUps = update(this.state.fillUps, { $splice: [[fillUpIndex, 1]]})
      this.setState({fillUps: fillUps})
    })
    .catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell numeric>Mileage</TableCell>
                <TableCell numeric>Volume</TableCell>
                <TableCell numeric>Price</TableCell>
                <TableCell>Topped Off</TableCell>
                <TableCell>Note</TableCell>
                <TableCell><FillUpCreateDialog vehicle={this.state.vehicle} addNewFillUp={this.addNewFillUp} /></TableCell>
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
        </Paper>
      </div>
    )
  }
}

export default FillUpsTable;
