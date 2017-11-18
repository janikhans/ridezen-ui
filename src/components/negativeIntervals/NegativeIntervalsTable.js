import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import NegativeIntervalRow from './NegativeIntervalRow';

class NegativeIntervalsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: this.props.vehicle,
      negativeIntervals: []
    }
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/negative_intervals.json`)
    .then(response => {
      this.setState({
        negativeIntervals: response.data
      })
    })
    .catch(error => console.log(error))
  }

  deleteNegativeInterval = (id) => {
    axios.delete(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/negative_intervals/${id}`)
    .then(response => {
      const negativeIntervalIndex = this.state.negativeIntervals.findIndex(x => x.id === id)
      const negativeIntervals = update(this.state.negativeIntervals, { $splice: [[negativeIntervalIndex, 1]]})
      this.setState({negativeIntervals: negativeIntervals})
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
                <TableCell>Service Item</TableCell>
                <TableCell numeric></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.negativeIntervals.map((negativeInterval, index) => {
                return(
                  <NegativeIntervalRow key={index} negativeInterval={negativeInterval}
                    deleteNegativeInterval={this.deleteNegativeInterval} />
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default NegativeIntervalsTable;
