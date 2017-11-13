import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import FillUpRow from './FillUpRow';
import NewFillUpForm from './NewFillUpForm';

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
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mileage</th>
            <th>Volume</th>
            <th>Price</th>
            <th>Topped Off</th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <NewFillUpForm vehicle={this.state.vehicle}
            addNewFillUp={this.addNewFillUp} />
          {this.state.fillUps.map((fillUp) => {
            return(<FillUpRow key={fillUp.id} fillUp={fillUp}
              deleteFillUp={this.deleteFillUp}/>)
          })}
        </tbody>
      </table>
    )
  }
}

export default FillUpsTable;
