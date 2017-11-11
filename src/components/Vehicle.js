import React, { Component } from 'react';
import axios from 'axios';

class Vehicle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      vehicleId: this.props.match.params.vehicleId,
      vehicle: null
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/vehicles/${this.state.vehicleId}.json`)
    .then(response => {
      this.setState({
        vehicle: response.data,
        loaded: true
      })
    })
    .catch(error => console.log(error))
  }

  render () {
    if (this.state.loaded) {
      return (
        <div className='vehicle-show'>
          <div><strong>Make:</strong> {this.state.vehicle.make}</div>
          <div><strong>Model:</strong> {this.state.vehicle.model}</div>
          <div><strong>Year:</strong> {this.state.vehicle.year}</div>
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
