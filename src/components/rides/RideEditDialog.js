import React, { Component } from 'react'
import axios from 'axios'
import ErrorsContainer from '../shared/ErrorsContainer'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class RideEditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.ride.name,
      errors: null,
      open: false
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = (e) => {
    const ride = {
      name: this.state.name
    }

    axios.put(
      `http://localhost:3001/api/v1/rides/${this.props.ride.id}`,
      {
        ride: ride
      })
    .then(response => {
      this.props.updateRide(response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  resetForm = () => {
    this.setState({
      open: false,
      name: this.props.ride.name,
      errors: null
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" onClick={this.handleClickOpen}>
          Edit
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Edit Ride</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Edit your ride. You will not be able to edit all fields such as starting mileage.`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Ride Name"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RideEditDialog
