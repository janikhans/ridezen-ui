import React, { Component } from 'react';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

class UnitsSelect extends Component {
  handleChange = (e) => {
    this.props.updateUnits(e.target.value);
  };

  render() {
    const units = [
      'miles',
      'kilometers',
      'hours',
      'days',
      'weeks',
      'months',
      'years'
    ]
    return (
      <FormControl style={{minWidth: '100%'}}>
        <InputLabel htmlFor="units">Units</InputLabel>
        <Select value={this.props.units}
          autoWidth
          name="units"
          onChange={this.handleChange}
          input={<Input id="units" />}
        >
          {units.map((unit, index) => {
            return (
              <MenuItem key={index} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</MenuItem>
            )}
          )}
        </Select>
      </FormControl>
    );
  }
}

export default UnitsSelect;
