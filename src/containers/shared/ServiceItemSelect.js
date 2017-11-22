import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as serviceItemSelectors from '../../store/serviceItems/reducer';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

class ServiceItemSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceItems: this.props.serviceItems
    }
  }

  handleChange = (e) => {
    const serviceItemIndex = this.state.serviceItems.findIndex(x => x.id === e.target.value)
    const serviceItem = this.state.serviceItems[serviceItemIndex]
    this.props.updateServiceItem(serviceItem);
  };

  render() {
    return (
      <div>
        <FormControl style={{minWidth: '100%'}}>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    serviceItems: serviceItemSelectors.getServiceItems(state)
  };
};

export default connect(mapStateToProps)(ServiceItemSelect)
