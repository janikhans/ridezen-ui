import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class VehicleCard extends Component {
  render () {
    return (
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <CardContent>
            <Typography type="body1">
              Vehicle #{this.props.vehicle.id}
            </Typography>
            <Typography type="headline" component="h2">
              {this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" component={Link} to={'/vehicles/' + this.props.vehicle.id}>View</Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default VehicleCard;
