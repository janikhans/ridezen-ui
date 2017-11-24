import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';

import VehicleDeleteDialog from '../../components/vehicles/VehicleDeleteDialog';
import VehicleEditDialog from '../../components/vehicles/VehicleEditDialog';
import VehicleIntervalsTable from '../../components/vehicleIntervals/VehicleIntervalsTable'
import NegativeIntervalsTable from '../../components/negativeIntervals/NegativeIntervalsTable'

import { fetchVehicleInfo, deleteVehicle, updateVehicle } from '../../store/vehicles/actions';
import * as vehiclesSelectors from '../../store/vehicles/reducer'

function TabContainer(props) {
  return <div>{props.children}</div>;
}

class VehicleShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'intervals'
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    if (this.props.vehicle) {
      this.props.fetchInfo(this.props.vehicle.id)
    } else {
      this.props.vehiclesRedirect()
    }
  }

  deleteVehicle = (id) => {
    this.props.deleteVehicle(this.props.vehicle.id)
  }

  updateVehicle = (vehicle) => {
    this.props.updateVehicle(vehicle)
  }

  render () {
    if (this.props.vehicle) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1">
              {this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}
            </Typography>
            <VehicleEditDialog vehicle={this.props.vehicle} updateVehicle={this.updateVehicle} />
            <VehicleDeleteDialog vehicle={this.props.vehicle} deleteVehicle={this.deleteVehicle} />
          </Paper>
          <Paper>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="accent"
              textColor="accent"
            >
              <Tab value="intervals" icon={<PhoneIcon />} label="INTERVALS" />
              <Tab value="negativeIntervals" icon={<FavoriteIcon />} label="NEGATIVE INTERVALS" />
            </Tabs>
          </Paper>
          <Paper>
            {this.state.value === 'intervals' && <TabContainer><VehicleIntervalsTable vehicle={this.props.vehicle} /></TabContainer>}
            {this.state.value === 'negativeIntervals' && <TabContainer><NegativeIntervalsTable vehicle={this.props.vehicle} /></TabContainer>}
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

const mapStateToProps = (state, ownProps) => {
  return {
    vehicle: vehiclesSelectors.getVehicleById(state, ownProps.match.params.vehicleId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (vehicleId) => dispatch(fetchVehicleInfo(vehicleId)),
    deleteVehicle: (vehicleId) => dispatch(deleteVehicle(vehicleId)),
    updateVehicle: (vehicle) => dispatch(updateVehicle(vehicle)),
    vehiclesRedirect: () => dispatch(push('/vehicles'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleShow)