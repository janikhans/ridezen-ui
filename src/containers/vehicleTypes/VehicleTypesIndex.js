import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { fetchVehicleTypes, addVehicleType, updateVehicleType, deleteVehicleType } from '../../store/vehicleTypes/actions';
import * as vehicleTypesSelectors from '../../store/vehicleTypes/reducer'

import VehicleTypeCreateDialog from '../../components/vehicleTypes/VehicleTypeCreateDialog';
import VehicleTypeRow from '../../components/vehicleTypes/VehicleTypeRow';

class VehicleTypesIndex extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  renderVehicleTypeRow(vehicleTypeId) {
    const vehicleType = this.props.vehicleTypesById[vehicleTypeId]
    return (
      <VehicleTypeRow key={vehicleType.id}
        vehicleType={vehicleType}
        deleteVehicleType={this.props.deleteVehicleType}
        updateVehicleType={this.props.updateVehicleType}
      />
    )
  }

  render () {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell numeric>Edit</TableCell>
                <TableCell numeric><VehicleTypeCreateDialog addVehicleType={this.props.addVehicleType} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.props.vehicleTypesIdArray, this.renderVehicleTypeRow.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleTypesById: vehicleTypesSelectors.getVehicleTypesById(state),
    vehicleTypesIdArray: vehicleTypesSelectors.getVehicleTypesIdArray(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchVehicleTypes()),
    addVehicleType: (vehicleType) => dispatch(addVehicleType(vehicleType)),
    deleteVehicleType: (vehicleTypeId) => dispatch(deleteVehicleType(vehicleTypeId)),
    updateVehicleType: (vehicleType) => dispatch(updateVehicleType(vehicleType))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTypesIndex)
