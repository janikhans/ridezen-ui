import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ErrorsContainer from '../shared/ErrorsContainer'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class FillUpCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mileage: '',
      volume: '',
      date: '',
      price: '',
      toppedOff: false,
      note: '',
      errors: null,
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

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
      errors: null,
      open: false
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Fill Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Every time you fill up your vehicle, record what how much you fill up with, how much you spent and your
              current mileage. This will be used for future calculations.
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <TextField
              autoFocus
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={this.state.date}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="mileage"
              label="Mileage"
              type="number"
              fullWidth
              value={this.state.mileage}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="volume"
              label="Volume"
              type="number"
              fullWidth
              value={this.state.volume}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={this.state.price}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="topped_off"
              label="Topped Off"
              type="checkbox"
              fullWidth
              value={this.state.topped_off}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="note"
              label="Additional Notes"
              type="text"
              fullWidth
              value={this.state.note}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default FillUpCreateDialog;
