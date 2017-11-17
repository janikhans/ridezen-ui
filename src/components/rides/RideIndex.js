import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import RideCard from './RideCard';
import RideCreateDialog from './RideCreateDialog';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class RideIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rides: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/rides.json')
    .then(response => {
      this.setState({rides: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewRide = (ride) => {
    const rides = update(this.state.rides, {
      $push: [ride]
    })
    this.setState({
      rides: rides
    })
  }

  render () {
    return (
      <div>
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="headline" component="h2">
              Your Garage
              <RideCreateDialog addNewRide={this.addNewRide} />
            </Typography>
          </Paper>
        </div>
        <Grid container spacing={24}>
          {this.state.rides.map((ride) => {
            return (
              <RideCard ride={ride} key={ride.id}
                onClick={this.enableEditing}
                onDelete={this.deleteRide} />
            )}
          )}
        </Grid>
      </div>
    )
  }
}

export default RideIndex;
