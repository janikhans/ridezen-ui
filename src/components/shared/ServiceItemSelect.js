import React, { Component } from 'react';
import axios from 'axios'

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

class ServiceItemSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceItems: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/service_items.json`)
    .then(response => {
      this.setState({
        serviceItems: response.data
      })
    })
    .catch(error => console.log(error))
  }

  handleChange = (e) => {
    this.props.updateServiceItem(e.target.value);
  };

  render() {
    return (
      <FormControl>
        <InputLabel htmlFor="serviceItem">Service Item</InputLabel>
        <Select value={this.props.serviceItemId}
          autoWidth
          name="serviceItem"
          onChange={this.handleChange}
          input={<Input id="serviceItem" />}
        >
          {this.state.serviceItems.map((serviceItem, index) => {
            return (
              <MenuItem key={index} value={serviceItem.id}>{serviceItem.name}</MenuItem>
            )}
          )}
        </Select>
      </FormControl>
    );
  }
}

export default ServiceItemSelect;
