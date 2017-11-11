import React, { Component } from 'react';

class Vehicle extends Component {
  render () {
    return (
      <div className='card'>
        <div><strong>Make:</strong> {this.props.vehicle.make}</div>
        <div><strong>Model:</strong> {this.props.vehicle.model}</div>
        <div><strong>Year:</strong> {this.props.vehicle.year}</div>
      </div>
    )
  }
}

export default Vehicle;
