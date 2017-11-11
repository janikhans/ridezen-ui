import React, { Component } from 'react'
import axios from 'axios'
import ErrorsContainer from './ErrorsContainer'

class ExistingVehicleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      make: this.props.vehicle.make,
      model: this.props.vehicle.model,
      year: this.props.vehicle.year,
      errors: null
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  hideForm = (e) => {
    this.props.disableEditing(this.props.vehicle.id)
    e.preventDefault();
  }

  handleSubmit = (e) => {
    const vehicle = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    }

    axios.put(
      `http://localhost:3001/api/v1/vehicles/${this.props.vehicle.id}`,
      {
        vehicle: vehicle
      })
    .then(response => {
      this.setState({ errors: null })
      this.props.updateVehicle(response.data)
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  render() {
    return (
      <div className="card">
        {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
        <form onSubmit={this.handleSubmit}>
          <input className='input' type="text"
            name="make" placeholder='Enter a Make'
            value={this.state.make} onChange={this.handleChange} />
          <input className='input'  type="text" name="model"
            placeholder='Enter a Model'
            value={this.state.model} onChange={this.handleChange} />
          <input className='input' type="number" name="year"
            placeholder='What year?'
            value={this.state.year} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
          <button onClick={this.hideForm}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default ExistingVehicleForm
