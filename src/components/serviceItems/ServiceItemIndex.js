import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import ServiceItemRow from './ServiceItemRow';
import ServiceItemCreateDialog from './ServiceItemCreateDialog';

class ServiceItemIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceItems: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/service_items.json')
    .then(response => {
      this.setState({serviceItems: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewServiceItem = (serviceItem) => {
    const serviceItems = update(this.state.serviceItems, {
      $push: [serviceItem]
    })
    this.setState({
      serviceItems: serviceItems
    })
  }

  render () {
    return (
      <div>
        <Paper className="paper-header" elevation={1}>
          <Typography type="headline" component="h2">
            Service Items
          </Typography>
        </Paper>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Distance</TableCell>
                <TableCell numeric>Units</TableCell>
                <TableCell numeric><ServiceItemCreateDialog addNewServiceItem={this.addNewServiceItem} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.serviceItems.map((serviceItem) => {
                return(
                  <ServiceItemRow key={serviceItem.id} serviceItem={serviceItem}/>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default ServiceItemIndex;
