import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import VehicleCard from './VehicleCard';
import ExistingVehicleForm from './ExistingVehicleForm';
import NewVehicleDialog from './NewVehicleDialog';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class VehiclesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicles: [],
      editingVehicleId: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/vehicles.json')
    .then(response => {
      this.setState({vehicles: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewVehicle = (vehicle) => {
    const vehicles = update(this.state.vehicles, {
      $push: [vehicle]
    })
    this.setState({
      vehicles: vehicles
    })
  }

  enableEditing = (id) => {
    this.setState({editingVehicleId: id})
  }

  disableEditing = (id) => {
    this.setState({editingVehicleId: null})
  }

  updateVehicle = (vehicle) => {
    const vehicleIndex = this.state.vehicles.findIndex(x => x.id === vehicle.id)
    const vehicles = update(this.state.vehicles, {
      [vehicleIndex]: { $set: vehicle }
    })
    this.setState({
      vehicles: vehicles,
      editingVehicleId: null
    })
  }

  deleteVehicle = (id) => {
    axios.delete(`http://localhost:3001/api/v1/vehicles/${id}`)
    .then(response => {
      const vehicleIndex = this.state.vehicles.findIndex(x => x.id === id)
      const vehicles = update(this.state.vehicles, { $splice: [[vehicleIndex, 1]]})
      this.setState({vehicles: vehicles})
    })
    .catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <div>
          <Paper className="paper" elevation={1}>
            <Typography type="headline" component="h2">
              Your Garage
              <NewVehicleDialog addNewVehicle={this.addNewVehicle} />
            </Typography>
          </Paper>
        </div>
        <div>
          {this.state.vehicles.map((vehicle) => {
            if(this.state.editingVehicleId === vehicle.id) {
              return(<ExistingVehicleForm vehicle={vehicle} key={vehicle.id}
                      updateVehicle={this.updateVehicle}
                      disableEditing={this.disableEditing} />)
            } else {
              return (<VehicleCard vehicle={vehicle} key={vehicle.id}
                       onClick={this.enableEditing}
                       onDelete={this.deleteVehicle} />)
            }
          })}
        </div>
      </div>
    )
  }
}

export default VehiclesContainer;
