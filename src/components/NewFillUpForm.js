import React, { Component } from 'react'
import axios from 'axios'
import Table, { TableCell, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
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
      <TableRow>
        <TableCell>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            placeholder="Date"
            type="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell>
          <TextField
            autoFocus
            margin="dense"
            name="mileage"
            placeholder="Mileage"
            type="number"
            value={this.state.mileage}
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell>
          <TextField
            autoFocus
            margin="dense"
            name="volume"
            placeholder="Volume"
            type="number"
            value={this.state.volume}
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell>
          <TextField
            autoFocus
            margin="dense"
            name="price"
            placeholder="Price"
            type="number"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell>
          <TextField
            autoFocus
            margin="dense"
            name="topped_off"
            placeholder="Topped Off"
            type="checkbox"
            value={this.state.topped_off}
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell>
          <TextField
            autoFocus
            margin="dense"
            name="note"
            placeholder="Additional Notes"
            type="text"
            value={this.state.note}
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell>
          {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
          <Button raised onClick={this.handleSubmit} color="primary">
            Create
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default NewFillUpForm;
