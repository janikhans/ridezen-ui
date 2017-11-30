import React, { Component } from 'react';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

class VehicleTypeSelect extends Component {
  handleChange = (e) => {
    this.props.updateVehicleType(e.target.value);
  };

  render() {
    return (
      <FormControl style={{minWidth: '100%'}}>
        <InputLabel htmlFor="vehicleTypes">Vehicle Type</InputLabel>
        <Select value={this.props.vehicleTypeId}
          autoWidth
          name="vehicleTypes"
          onChange={this.handleChange}
          input={<Input id="vehicleTypes" />}
        >
          {this.props.vehicleTypes.map(vehicleType => {
            return (
              <MenuItem key={vehicleType.id} value={vehicleType.id}>
                {vehicleType.name}
              </MenuItem>
            )}
          )}
        </Select>
      </FormControl>
    );
  }
}

export default VehicleTypeSelect;
