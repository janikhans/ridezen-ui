import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Vehicles from "./Vehicles";
import Contact from "./Contact";
import Vehicle from "./components/Vehicle";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Trackr</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/vehicles">Vehicles</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/vehicles" component={Vehicles} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/vehicles/:vehicleId" component={Vehicle} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
