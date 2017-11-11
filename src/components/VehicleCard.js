import React, { Component } from 'react';
import { Link } from "react-router-dom";

class VehicleCard extends Component {

  handleClick = (e) => {
    this.props.onClick(this.props.vehicle.id)
    e.preventDefault()
  }

  handleDelete = (e) => {
    this.props.onDelete(this.props.vehicle.id)
    e.preventDefault()
  }

  render () {
    let links = [
      <Link to={'/vehicles/' + this.props.vehicle.id} >View</Link>,
      <Link to='' onClick={this.handleClick}>Edit</Link>,
      <Link to='' onClick={this.handleDelete}>Delete</Link>
    ]

    return (
      <div className='card'>
        <div><strong>Make:</strong> {this.props.vehicle.make}</div>
        <div><strong>Model:</strong> {this.props.vehicle.model}</div>
        <div><strong>Year:</strong> {this.props.vehicle.year}</div>
        <div>
          {links}
        </div>
      </div>
    )
  }
}

export default VehicleCard;
