import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import Vehicle from './Vehicle';
// import VehicleForm from './VehicleForm';
import NewVehicleForm from './NewVehicleForm';

class VehiclesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newVehicleFormVisible: false,
      vehicles: []
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

  render () {
    let button = null;
    if (this.state.newVehicleFormVisible) {
      button = <button className="newIdeaButton" onClick={this.hideNewVehicleForm}>Hide Vehicle Form</button>
    } else {
      button = <button className="newIdeaButton" onClick={this.showNewVehicleForm}>New Vehicle</button>
    }

    return (
      <div>
        <div>
          {button}
        </div>
        <div>
          {this.state.newVehicleFormVisible && <NewVehicleForm addNewVehicle={this.addNewVehicle}/>}
          {this.state.vehicles.map((vehicle) => {
            return (<Vehicle vehicle={vehicle} key={vehicle.id} />)
          })}
        </div>
      </div>
    )
  }
}

export default VehiclesContainer;
