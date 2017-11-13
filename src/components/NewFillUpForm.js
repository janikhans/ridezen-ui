import React, { Component } from 'react'
import axios from 'axios'
import ErrorsContainer from './ErrorsContainer'

class NewFillUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mileage: '',
      volume: '',
      date: '',
      price: '',
      toppedOff: false,
      note: '',
      errors: null
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const fillUp = {
      mileage: this.state.mileage,
      volume: this.state.volume,
      date: this.state.date,
      price: this.state.price,
      topped_off: this.state.topped_off,
      note: this.state.note
    }

    axios.post(
      `http://localhost:3001/api/v1/vehicles/${this.props.vehicle.id}/fill_ups`,
      {
        fill_up: fillUp
      })
    .then(response => {
      this.props.addNewFillUp(response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  resetForm = () => {
    this.setState({
      mileage: '',
      volume: '',
      date: '',
      price: '',
      topped_off: false,
      note: '',
      errors: null
    })
  }

  render() {
    return (
      <tr>
        <form onSubmit={this.handleSubmit}>
          <td>
            <input className='input' type="date"
              name="date" placeholder='Date'
              value={this.state.date} onChange={this.handleChange}
            />
          </td>
          <td>
            <input className='input' type="number"
              name="mileage" placeholder='Mileage'
              value={this.state.mileage} onChange={this.handleChange}
            />
          </td>
          <td>
            <input className='input' type="number"
              name="volume" placeholder='Volume'
              value={this.state.volume} onChange={this.handleChange}
            />
          </td>
          <td>
            <input className='input' type="number"
              name="price" placeholder='Price'
              value={this.state.price} onChange={this.handleChange}
            />
          </td>
          <td>
            <input className='input' type="checkbox"
              name="topped_off"
              value={this.state.topped_off} onChange={this.handleChange}
            />
          </td>
          <td>
            <input className='input' type="input"
              name="note" placeholder="Additional Notes?"
              value={this.state.note} onChange={this.handleChange}
            />
          </td>
          <td>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <input type="submit" value="Submit" />
          </td>
        </form>
      </tr>
    )
  }
}

export default NewFillUpForm;
