import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import OemIntervalRow from './OemIntervalRow';
import OemIntervalCreateDialog from './OemIntervalCreateDialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class OemIntervalsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: this.props.vehicle,
      oemIntervals: []
    }
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/oem_intervals.json`)
    .then(response => {
      this.setState({
        oemIntervals: response.data
      })
    })
    .catch(error => console.log(error))
  }

  addNewOemInterval = (oemInterval) => {
    const oemIntervals = update(this.state.oemIntervals, {
      $unshift: [oemInterval]
    })
    this.setState({
      oemIntervals: oemIntervals
    })
  }

  deleteOemInterval = (id) => {
    axios.delete(`http://localhost:3001/api/v1/vehicles/${this.state.vehicle.id}/oem_intervals/${id}`)
    .then(response => {
      const oemIntervalIndex = this.state.oemIntervals.findIndex(x => x.id === id)
      const oemIntervals = update(this.state.oemIntervals, { $splice: [[oemIntervalIndex, 1]]})
      this.setState({oemIntervals: oemIntervals})
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
                <TableCell numeric>Units</TableCell>
                <TableCell numeric>Distance</TableCell>
                <TableCell numeric><OemIntervalCreateDialog vehicle={this.state.vehicle} addNewOemInterval={this.addNewOemInterval} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.oemIntervals.map((oemInterval) => {
                return(
                  <OemIntervalRow key={oemInterval.id} oemInterval={oemInterval}
                    deleteOemInterval={this.deleteOemInterval} />
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default OemIntervalsTable;
