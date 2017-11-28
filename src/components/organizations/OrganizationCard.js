import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class OrganizationCard extends Component {
  render () {
    return (
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <CardContent>
            <Typography type="body1">
              {this.props.organization.description}
            </Typography>
            <Typography type="headline" component="h2">
              {this.props.organization.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" component={Link} to={'/organizations/' + this.props.organization.id}>View</Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default OrganizationCard;
