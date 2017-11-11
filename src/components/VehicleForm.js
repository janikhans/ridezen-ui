import React, { Component } from 'react'
import axios from 'axios'

class VehicleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      make: this.props.vehicle.make,
      model: this.props.vehicle.model,
      year: this.props.vehicle.year
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="card">
        <form>
          <input className='input' type="text"
            name="make" placeholder='Enter a Make'
            value={this.state.title} onChange={this.handleChange} />
          <input className='input'  type="text" name="model"
            placeholder='Enter a Model'
            value={this.state.model} onChange={this.handleChange} />
          <input className='input' type="number" name="year"
            placeholder='What year?'
            value={this.state.year} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default VehicleForm
