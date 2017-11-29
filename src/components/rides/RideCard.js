import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class RideCard extends Component {
  render () {
    return (
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <CardContent>
            <Typography type="body1">
              {this.props.organization.name}
            </Typography>
            <Typography type="body1">
              {this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}
            </Typography>
            <Typography type="headline" component="h2">
              {this.props.ride.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" component={Link} to={`organizations/${this.props.ride.organization_id}/rides/${this.props.ride.id}`}>View</Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default RideCard;
