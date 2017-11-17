import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import ServiceItemDeleteDialog from './ServiceItemDeleteDialog';
import ServiceItemEditDialog from './ServiceItemEditDialog';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class ServiceItemShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceItem: null,
      redirect: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/service_items/${this.props.match.params.serviceItemId}.json`)
    .then(response => {
      this.setState({
        serviceItem: response.data
      })
    })
    .catch(error => console.log(error))
  }

  deleteServiceItem = (id) => {
    axios.delete(`http://localhost:3001/api/v1/serviceItems/${id}`)
    .then(response => {
      this.setState({ redirect: true })
    })
    .catch(error => console.log(error))
  }

  updateServiceItem = (serviceItem) => {
    this.setState({
      serviceItem: serviceItem
    })
  }

  render () {
    if (this.state.redirect) {
      return (
        <Redirect to='/service-items'/>
      )
    } else if (this.state.serviceItem) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1" component="h2">
              {this.state.serviceItem.name} {this.state.serviceItem.distance} {this.state.serviceItem.units}
            </Typography>
            <ServiceItemEditDialog serviceItem={this.state.serviceItem} updateServiceItem={this.updateServiceItem} />
            <ServiceItemDeleteDialog serviceItem={this.state.serviceItem} deleteServiceItem={this.deleteServiceItem} />
          </Paper>
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

export default ServiceItemShow;