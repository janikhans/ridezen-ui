import React, { Component } from 'react';
import axios from 'axios';
import FillUpsTable from './FillUpsTable'

class Vehicle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: null
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/vehicles/${this.props.match.params.vehicleId}.json`)
    .then(response => {
      this.setState({
        vehicle: response.data
      })
    })
    .catch(error => console.log(error))
  }

  render () {
    if (this.state.vehicle) {
      return (
        <div className='vehicle-show'>
          <div>
            <div><strong>Make:</strong> {this.state.vehicle.make}</div>
            <div><strong>Model:</strong> {this.state.vehicle.model}</div>
            <div><strong>Year:</strong> {this.state.vehicle.year}</div>
          </div>
          <FillUpsTable vehicle={this.state.vehicle} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Wait...</h1>
        </div>
    )}
  }
}

export default Vehicle;
