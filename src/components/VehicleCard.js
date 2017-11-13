import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class VehicleCard extends Component {

  handleClick = (e) => {
    this.props.onClick(this.props.vehicle.id)
    e.preventDefault()
  }

  render () {
    let links = [
      <Button dense color="primary"><Link className="no-decoration" to={'/vehicles/' + this.props.vehicle.id} >View</Link></Button>,
      <Button dense color="primary" onClick={this.handleClick}>Edit</Button>
    ]

    return (
      <div className="card-list-item">
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
            {links}
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default VehicleCard;
