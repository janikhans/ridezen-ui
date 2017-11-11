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
      newVehicleFormVisible: false,
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

  showNewVehicleForm = () => {
    this.setState({ newVehicleFormVisible: true })
  }

  hideNewVehicleForm = () => {
    this.setState({ newVehicleFormVisible: false })
  }

  addNewVehicle = (vehicle) => {
    const vehicles = update(this.state.vehicles, {
      $splice: [[0, 0, vehicle]]
    })
    this.setState({
      vehicles: vehicles
    })
  }

  enableEditing = (id) => {
    this.setState({editingVehicleId: id})
  }

  updateVehicle = (vehicle) => {
    console.log(vehicle.id)
    const vehicleIndex = this.state.vehicles.findIndex(x => x.id === vehicle.id)
    const vehicles = update(this.state.vehicles, {
      [vehicleIndex]: { $set: vehicle }
    })
    console.log(this.state.vehicles)
    console.log(vehicles)
    this.setState({
      vehicles: vehicles,
      editingVehicleId: null
    })
  }

  render () {
    let button = null;
    if (this.state.newVehicleFormVisible) {
      button = <button className="newVehicleButton" onClick={this.hideNewVehicleForm}>Cancel Vehicle</button>
    } else {
      button = <button className="newVehicleButton" onClick={this.showNewVehicleForm}>New Vehicle</button>
    }

    return (
      <div>
        <div>
          {button}
        </div>
        <div>
          {this.state.newVehicleFormVisible && <NewVehicleForm addNewVehicle={this.addNewVehicle}/>}
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
        </div>
      </div>
    )
  }
}

export default VehiclesContainer;
