import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import RideDeleteDialog from './RideDeleteDialog';
import RideEditDialog from './RideEditDialog';
import FillUpsTable from '../fillUps/FillUpsTable'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class RideShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ride: null,
      redirect: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/rides/${this.props.match.params.rideId}.json`)
    .then(response => {
      this.setState({
        ride: response.data
      })
    })
    .catch(error => console.log(error))
  }

  deleteRide = (id) => {
    axios.delete(`http://localhost:3001/api/v1/rides/${id}`)
    .then(response => {
      this.setState({ redirect: true })
    })
    .catch(error => console.log(error))
  }

  updateRide = (ride) => {
    this.setState({
      ride: ride
    })
  }

  render () {
    if (this.state.redirect) {
      return (
        <Redirect to='/garage'/>
      )
    } else if (this.state.ride) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1" component="h2">
              {this.state.ride.name}
            </Typography>
            <Typography type="subheading" component="p">
              Starting Mileage: {this.state.ride.starting_mileage}
            </Typography>
            <Typography type="subheading" component="p">
              Current Mileage: {this.state.ride.current_mileage}
            </Typography>
            <RideEditDialog ride={this.state.ride} updateRide={this.updateRide} />
            <RideDeleteDialog ride={this.state.ride} deleteRide={this.deleteRide} />
          </Paper>
          <FillUpsTable ride={this.state.ride} />
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

export default RideShow;
