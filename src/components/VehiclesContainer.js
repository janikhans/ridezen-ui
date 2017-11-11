import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import Vehicle from './Vehicle';
import ExistingVehicleForm from './ExistingVehicleForm';
import NewVehicleForm from './NewVehicleForm';

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
      vehicles: vehicles,
      newVehicleFormVisible: false
    })
  }

  enableEditing = (id) => {
    this.setState({editingVehicleId: id})
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
          {this.state.vehicles.map((vehicle) => {
            if(this.state.editingVehicleId === vehicle.id) {
              return(<ExistingVehicleForm vehicle={vehicle} key={vehicle.id}
                      updateVehicle={this.updateVehicle} />)
            } else {
              return (<Vehicle vehicle={vehicle} key={vehicle.id}
                       onClick={this.enableEditing}
                       onDelete={this.deleteVehicle} />)
            }
          })}
          <NewVehicleForm addNewVehicle={this.addNewVehicle}/>
        </div>
      </div>
    )
  }
}

export default VehiclesContainer;
