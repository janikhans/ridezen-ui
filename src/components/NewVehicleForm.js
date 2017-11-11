import React, { Component } from 'react'
import axios from 'axios'
import ErrorsContainer from './ErrorsContainer'

class NewVehicleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      make: '',
      model: '',
      year: '',
      errors: null,
      formVisible: false,
    }
  }

  showForm = () => {
    this.setState({ formVisible: true })
  }

  hideForm = (e) => {
    this.setState({ formVisible: false })
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const vehicle = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    }

    axios.post(
      `http://localhost:3001/api/v1/vehicles`,
      {
        vehicle: vehicle
      })
    .then(response => {
      this.props.addNewVehicle(response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  resetForm = () => {
    this.setState({
      make: '',
      model: '',
      year: '',
      errors: null,
      formVisible: false,
    })
  }

  render() {
    let content = null;

    if (this.state.formVisible) {
      content =
        <div>
          {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
          <form onSubmit={this.handleSubmit}>
            <input className='input' type="text"
              name="make" placeholder='Enter a Make'
              value={this.state.make} onChange={this.handleChange} />
            <input className='input' type="text" name="model"
              placeholder='Enter a Model'
              value={this.state.model} onChange={this.handleChange} />
            <input className='input' type="number" name="year"
              placeholder='What year?'
              value={this.state.year} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
            <button onClick={this.hideForm}>Cancel</button>
          </form>
        </div>
    } else {
      content = <button className="newVehicleButton" onClick={this.showForm}>New Vehicle</button>
    }

    return (
      <div className="card">
        {content}
      </div>
    );
  }
}

export default NewVehicleForm;
